using HttpServer
using WebSockets
using JSON

type Token
    i::Int
    j::Int
    label::String
end

function Token(i::Int, j::Int)
    h = i + j
    id = Int(rem(h,length(posconf))) + 1
    label = posconf[id][1]
    Token(i, j, label)
end

function todict(t::Token)
    Dict("i"=>t.i, "j"=>t.j, "label"=>t.label)
end

function readconf(path::String)
    lines = open(readlines, path)
    map(lines) do line
        items = split(chomp(line), '\t')
        (items[1], items[2])
    end
end

const filepath = dirname(@__FILE__)
const clients = Dict()
const posconf = readconf("pos.conf")
const entityconf = readconf("entity.conf")

wsh = WebSocketHandler() do req, client
    println("Client: $(client.id) is connected.")
    while true
        #println("Request from $(client.id) recieved.")
        msg = String(read(client))
        length(msg) > 1000 && continue

        doc = Vector{Token}[]
        tokens = Token[]
        index = 1
        for i = 1:length(msg)
            c = msg[i]
            if c == ' '
                index < i && push!(tokens, Token(index,i-1))
                index = i + 1
            elseif c == '\n'
                index < i && push!(tokens, Token(index,i-1))
                length(tokens) > 0 && push!(doc, tokens)
                tokens = Token[]
                index = i + 1
            end
        end
        index <= length(msg) && push!(tokens, Token(index,length(msg)))
        length(tokens) > 0 && push!(doc, tokens)

        postags = map(s -> map(todict,s), doc)
        entities = map(doc) do tokens
            data = []
            for t in tokens
                rem(t.i,3) == 0 || continue
                id = Int(rem(t.i,length(entityconf))) + 1
                label = entityconf[id][1]
                push!(data, todict(Token(t.i,t.j,label)))
            end
            data
        end
        trans_ja = "日本語の翻訳結果です。"
        trans_en = "This is an example of English translation."
        trans_cn = "这是一个中国的翻译结果。"

        res = JSON.json(Dict("pos"=>postags,"entity"=>entities,"trans-ja"=>trans_ja,"trans_en"=>trans_en,"trans_cn"=>trans_cn))
        write(client, res)
    end
end

onepage = readstring(joinpath(dirname(@__FILE__), "index.html"))
httph = HttpHandler() do req::Request, res::Response
    Response(onepage)
end
server = Server(httph, wsh)
run(server, 3000)
