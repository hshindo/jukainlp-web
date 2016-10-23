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

function readconf(path::String)
    lines = open(readlines, path)
    map(lines) do line
        items = split(chomp(line), '\t')
        (items[1], items[2])
    end
end

const filepath = dirname(@__FILE__)
const clients = Dict()
const posconf = readconf("$(filepath)/pos.conf")
const entityconf = readconf("$(filepath)/entity.conf")

function create_error(msg::String)
    dict = Dict(
        "error": msg,
    )
    JSON.json(dict)
end

wsh = WebSocketHandler() do req, client
    println("Client: $(client.id) is connected.")
    while true
        #println("Request from $(client.id) recieved.")
        msg = String(read(client))
        if length(msg) > 2000
            write(client, create_error("Error: the mssage length exceeds 2000."))
            continue
        end

        json = try
            JSON.parse(msg)
        catch
            write(client, create_error("Error: invalid json format: $(msg)"))
            continue
        end
        if !haskey(json, "text")
            write(client, create_error("Error: key: text does not exist. Check the JSON format."))
            continue
        end
        text = json["text"]
        doc = Vector{Token}[]
        sents = split(text, '\n', keep=false)
        for sent in sents
            tokens = Token[]
            index = 1
            for i = 1:length(sent)
                c = sent[i]
                if c == ' '
                    index < i && push!(tokens, Token(index,i-1))
                    index = i + 1
                end
            end
            index <= length(sent) && push!(tokens, Token(index,length(sent)))
            length(tokens) > 0 && push!(doc, tokens)
        end

        sentences = []
        #trans_ja, trans_en, trans_cn = [], [], []
        for i = 1:length(doc)
            tokens = doc[i]
            #str = "I have a pen."
            annos = []
            for t in tokens
                push!(annos, ["pos", t.i-1,t.j-1,t.label])
                if rem(t.i,4) == 0
                    id = Int(rem(t.i,length(entityconf))) + 1
                    label = entityconf[id][1]
                    push!(annos, ["entity",t.i-1,t.j-1,label])
                end
            end
            push!(sentences, Dict("text"=>sents[i], "anno"=>annos))
            #push!(trans_ja, "日本語の翻訳結果です。")
            #push!(trans_en, "This is an example of English translation.")
            #push!(trans_cn, "这是一个中国的翻译结果。")
        end
        res = JSON.json(sentences)
        #println(res)
        write(client, res)
    end
end

onepage = readstring(joinpath(dirname(@__FILE__), "index.html"))
httph = HttpHandler() do req::Request, res::Response
    Response(onepage)
end
server = Server(httph, wsh)
run(server, 3000)
