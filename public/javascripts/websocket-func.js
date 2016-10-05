// var connection = new WebSocket('ws://' + window.location.host);
var connection = new WebSocket('ws://' + 'jukainlp.hshindo.com');

//-- init setting for Ace code editor
var editor = ace.edit("editor");
editor.setFontSize(18);
editor.setTheme("ace/theme/chrome");
editor.getSession().setUseWrapMode(true);
editor.getSession().setTabSize(4);
editor.getSession().setUseSoftTabs(true);
editor.container.style.lineHeight = 3;
editor.renderer.updateFontSize();
editor.focus();
//-- add this to remove caution...
editor.$blockScrolling = Infinity;

//========================================================//
var isSelect_AnalPOS    = true,
    isSelect_AnalNE     = true,
    isSelect_AnalWiki   = true,
    
    isSelect_TransEn    = true,
    isSelect_TransJp    = true,
    isSelect_TransCn    = true;
    input_lang          = 'EN';

//-- referred to JapaneseRegex.js
function whatCode(codes) {
    var code;
    var eng = 0;
    var jpn = 0;
    for( var i = 0; i < codes.length; i++ ) {
        code = Number(codes.charCodeAt(i));
        if( code < 0x80 )
            eng++;
        else
            jpn++;
    }
    if( eng > jpn )
        return 'EN';    //-- case of English
    else
        return 'JP';    //-- case of Japanese
}

//========================================================//
//-- Ace Editor in the left
editor.getSession().on('change', function(e) {
    var regex_patt;
    var data = editor.getValue();
    var $objEn = $('#bottomStatusBar .status-left-part span:nth-child(2)'),
        $objJp = $('#bottomStatusBar .status-left-part span:last-child');

    if($('#state-lang-auto').val() == 'true') {
        input_lang = whatCode(data);
        if(input_lang == 'EN') {
            $objEn.css({
                'border': '2px solid orange',
                'box-sizing': 'border-box',
                'color': 'orange',
            });
            $objJp.css({
                'border': '0',
                'color': 'white',
            });
        } else if(input_lang == 'JP') {
            $objJp.css({
                'border': '2px solid orange',
                'box-sizing': 'border-box',
                'color': 'orange',
            });
            $objEn.css({
                'border': '0',
                'color': 'white',
            });
        }
    }//::::::::::::::::::::::://
    else if($('#state-lang-en').val() == 'true') {
        $objEn.css({
            'border': '0',
            'color': 'white',
        });
        $objJp.css({
            'border': '0',
            'color': 'white',
        });

        regex_patt = /[^A-Za-z 0-9]+$/g;
        if(regex_patt.test(data)) {
            console.log(regex_patt.test(data));
            //-- something...
        }
    }//::::::::::::::::::::::://
    else if($('#state-lang-jp').val() == 'true') {
        $objEn.css({
            'border': '0',
            'color': 'white',
        });
        $objJp.css({
            'border': '0',
            'color': 'white',
        });

        regex_patt = /[\u3000-\u303F]|[\u3040-\u309F]|[\u30A0-\u30FF]|[\uFF00-\uFFEF]|[\u4E00-\u9FAF]|[\u2605-\u2606]|[\u2190-\u2195]|\u203B/g;
        if(regex_patt.test(data)) {
            console.log(regex_patt.test(data));
            //-- something...
        }
    }//::::::::::::::::::::::://

    if (data.length == 0) {
        dispatcher.post('requestRenderData',
            [{
                'text': "",
            }]
        );
        return;
    }
    
    connection.send(data);
    ////////////////////////////////////////////
    // var Dict;
    // var data = editor.getValue();
    // if (data.length == 0) {
    //     dispatcher.post('requestRenderData',
    //         [{
    //             'text': "",
    //             'pos': "",
    //             'ne': "",
    //             'wiki': "",
    //             'trans-ja': ""
    //         }]
    //     );
    //     return;
    // }
    // Dict = [{
    //     'text': data,
    //     'pos': "",
    //     'ne': "",
    //     'wiki': "",
    //     'trans-ja': ""
    // }];
    // connection.send(Dict);
    ////////////////////////////////////////////
});

//-------------------------------------------------------//
// サーバーへ送信する情報の例（JSON）
// Dict(
//     "text" => "Darth Vador, also known as Anakin Skywalker, is a fictional character.\nHe is originally a good person, but",
//     "pos" => "",
//     "ne" => "",
//     "wiki" => "",
//     "trans-ja" => "",
// )
//-------------------------------------------------------//

//-------------------------------------------------------//
// サーバーから返つてくる情報の例（JSON）
// Dict(
//     "text" => ["Darth","Vador",",","also","known","as","Anakin","Skywalker",
//         "is","a","fictional","character","."],
//     "pos" => ["1:1:NNP","2:2:NNP","3:3:,","4:4:RB","5:5:VBN","6:6:IN"],
//     "ne" => ["1:2:PERSON","7:8:PERSON"],
//     "wiki" => ["1:2:Darth_Vader","7:8:Darth_Vader"],
//     "trans-ja" => "ダースベイダー、またはアナキンスカイウオーカー、は空想のキャラクターだ。",
// ),
// Dict(
//     "text" => ["He","is","originally","a","good","person"],
//     "pos" => ["1:1:PRP","2:2:VBZ","3:3:RB","4:4:DT","5:5:JJ","6:6:NN","7:7:,","8:8:CC"],
//     "trans-ja" => "彼はもともと良い人間だつた、しかし"
// )
//-------------------------------------------------------//


//========================================================//
//-- Customized Brat Annotation Tool Viewer in the right
var dispatcher;
var conf;
//-- [Reference URL]: "http://brat.nlplab.org/embed.html"
var jsLocation   = './javascripts/lib',
    fontLocation = './stylesheets/static/fonts';
head.js(
    //-- External libraries
    jsLocation + '/jquery.min.js',
    jsLocation + '/jquery.svg.min.js',
    jsLocation + '/jquery.svgdom.min.js',
    //-- Helper modules
    jsLocation + '/configuration.js',
    jsLocation + '/util.js',
    jsLocation + '/annotation_log.js',
    jsLocation + '/webfont.js',
    //-- Logic modules
    jsLocation + '/dispatcher.js',
    jsLocation + '/url_monitor.js',
    jsLocation + '/visualizer.js'
);
var webFontURLs = [
    'https://fonts.googleapis.com/css?family=Noto+Sans'
];

$(function() {
    connection.onmessage = function(msg) {
        isSelect_AnalPOS = $('#state-anal-pos').val();
        isSelect_AnalNE = $('#state-anal-ne').val();
        isSelect_AnalWiki = $('#state-anal-wiki').val();

        isSelect_TransEn = $('#state-trans-en').val();
        isSelect_TransJp = $('#state-trans-jp').val();
        isSelect_TransCn = $('#state-trans-cn').val();
        /////////////////////////////////////////////////
        if (conf === undefined) {
            conf = JSON.parse(msg.data);
            head.ready(function() {
                dispatcher = Util.embed('view', conf, {}, webFontURLs);
            });
        }
        if (dispatcher === undefined) return;

        var doc = JSON.parse(msg.data);
        var text = "";
        var entities = [];
        var display = {}; //-- added for customization in [visualizer.js] | suisun
        var id = 1;
        var pos = 0;
        var idx = 0;
        for (var i = 0; i < doc.length; i++) {
            var sent = doc[i];
            text += sent.map(t => t.form).join(" ") + "\n";
            //-- POS
            //if(isSelect_AnalPOS == 'true') 
            {
                for (var k = 0; k < sent.length; k++) {
                    var t = sent[k];
                    t["id"] = "T" + id;
                    t["bpos"] = pos;
                    t["epos"] = pos + t.form.length;

                    var e = [ t.id, t.cat, [[ t.bpos, t.epos ]] ];
                    entities.push(e);
                    pos += t.form.length + 1;
                    id += 1;
                }
            }
            //-- NE
            if(isSelect_AnalNE == 'true') 
            {
                for (var k = 0; k < sent.length; k++) {
                    var t = sent[k];
                    if (t.ne.length == 0) continue;
                    var tag = t.ne[0];
                    var len = t.ne[1];
                    var last = sent[k+len-1];

                    var e = [ t.id+"NE", tag, [[ t.bpos, last.epos ]] ];
                    entities.push(e);
                }
            }
            //-- Wiki-link
            if(isSelect_AnalWiki == 'true') 
            {
                for (var k = 0; k < sent.length; k++) {
                    var t = sent[k];
                    if (t.link.length == 0) continue;
                    var tag = t.link[0];
                    var len = t.link[1];
                    var last = sent[k+len-1];

                    var e = [ t.id+"WikiLink", tag, [[ t.bpos, last.epos ]] ];
                    entities.push(e);
                }
            }

            //------------------------------//
            display[idx] = "i"; idx++;
            //-- translation substitute
            var trans = "こんにちは。お世話になります。\n";
            
            if(isSelect_TransEn == 'true') {
                trans = "Hello\n";
                if(input_lang == 'EN') //-- input string
                    trans = sent.map(t => t.form).join(" ") + "\n";
                display[idx] = "EN"; idx++;
                text += trans;
                pos += trans.length;
            }
            if(isSelect_TransJp == 'true') {
                trans = "こんにちは。お世話になります。\n";
                if(input_lang == 'JP') //-- input string
                    trans = sent.map(t => t.form).join(" ") + "\n";
                display[idx] = "JP"; idx++;
                text += trans;
                pos += trans.length;
            }
            if(isSelect_TransCn == 'true') {
                trans = "你好。最近你身体怎么样？\n";
                if(input_lang == 'CN') //-- input string
                    trans = sent.map(t => t.form).join(" ") + "\n";
                display[idx] = "CN"; idx++;
                text += trans;
                pos += trans.length;
            }
            //------------------------------//
        }
        //------------------------------//
        display.showPOS = isSelect_AnalPOS;
        display.showNE  = isSelect_AnalNE;
        display.showWIKI= isSelect_AnalWiki;
        //------------------------------//
        var jukai = { 'text': text, 'entities': entities, 'display': display };
        dispatcher.post('requestRenderData', [jukai]);
    }
});
