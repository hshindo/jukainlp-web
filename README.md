# JukaiNLP Web
<p align="center"><img src="https://github.com/hshindo/jukainlp-web/blob/master/jukainlp-web.png" width="800"></p>

## Installation
Clone the repository:
```
git clone https://github.com/hshindo/jukainlp-web.git
```

Then,
```
npm install -g npm
npm install -g babel webpack webpack-dev-server
npm install
```

## Usage
To run the server,
```
npm start
```
then open your browser: `localhost:7777`.

## Format
From client to server,
```javascript
{
    "text": "I have a pen.\nHe is kind",
    "lang": "en"
    "pos": true,
    "entity": true,
    "trans-ja": true,
    "trans-en": true,
    "trans-cn": true,
}
```
From server to client,
```javascript
{
    "sentence": [
        [1,13], [15,24],
    ],
    "pos": [
        [1,1,"NNP"], [3,6,"VBP"], [8,8,"DT"], [10,13,"NN"],
        [15,16,"NNP"], [18,19,"VBP"], [21,24,"JJ"],
    ],
    "entity": [
        [1,6,"PERSON"], [15,19,"LOCATION"],
    ],
    "trans-ja": [
        "私はペンを持っています。",
        "彼は親切です。"
    ],
    "trans_en": [
        "I have a pen.",
        "He is kind",
    ],
    "trans_cn": [
        "我有一支笔。",
        "他人很好",
    ],
}
```
Note that the range index starts at 1.
