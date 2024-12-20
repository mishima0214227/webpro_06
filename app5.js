const express = require("express");
const app = express();

app.set("view engine", "ejs");
app.use("/public", express.static(__dirname + "/public"));

// じゃんけん機能に負け数を追加
app.get("/janken", (req, res) => {
  let hand = req.query.hand;
  let win = Number(req.query.win) || 0;
  let lose = Number(req.query.lose) || 0;  // 負け数の初期化
  let total = Number(req.query.total) || 0;

  const num = Math.floor(Math.random() * 3 + 1);
  let cpu = num === 1 ? "グー" : num === 2 ? "チョキ" : "パー";

  let judgement = hand === cpu ? "引き分け" : 
                  (hand === "グー" && cpu === "チョキ") || 
                  (hand === "チョキ" && cpu === "パー") ||
                  (hand === "パー" && cpu === "グー") ? "勝ち" : "負け";

  if (judgement === "勝ち") {
    win++;
  } else if (judgement === "負け") {
    lose++;  // 負け数をカウント
  }
  total++;

  res.render("janken", { your: hand, cpu: cpu, judgement: judgement, win: win, lose: lose, total: total });
});


// しりとりヘルパー機能
app.get("/shiritori", (req, res) => {
  const word = req.query.word || "";
  let nextWordSuggestion = "";
  let isValidShiritori = true;
  let gameOver = false;

  if (word) {
    const lastChar = word.slice(-1);

    if (lastChar === "ん") {
      gameOver = true;
      nextWordSuggestion = "んで終わったら負けだよ〜〜〜ん！ｗ";
    } else {
      const shiritoriWords = {
        あ: ["あんてん", "あんぱん"],
        い: ["いんげん"],
        う: ["うんてん"],
        え: ["えん","エイリアン"],
        お: ["おんせん"],
        か: ["かんぱん"],
        き: ["きんかん"],
        く: ["くもん"],
        け: ["けんばん"],
        こ: ["こんとん"],
        さ: ["サテン"],
        し: ["しんかんせん"],
        す: ["すいかん"],
        せ: ["せんてん"],
        そ: ["そうめん"],
        た: ["たん"],
        ち: ["ちん"],
        つ: ["ツイン"],
        て: ["てんしんはん"],
        と: ["とりてん"],
        な: ["なんばん"],
        に: ["にんじん"],
        ぬ: ["ぬらりひょん"],
        ね: ["ねん"],
        の: ["のうえん"],
        は: ["はんぺん"],
        ひ: ["ひん"],
        ふ: ["ふん"],
        へ: ["へん"],
        ほ: ["ほんこん"],
        ま: ["まんとん"],
        み: ["みんとん"],
        む: ["むかん"],
        め: ["めん"],
        も: ["もん"],
        や: ["やげん"],
        ゆ: ["ゆうれん"],
        よ: ["ようけん"],
        ら: ["ランタン","ライン"],
        り: ["りん"],
        る: ["るいけん"],
        れ: ["れんたん"],
        ろ: ["ろんぶん"],
        わ: ["わんたん"]
      };
      

      if (shiritoriWords[lastChar]) {
        nextWordSuggestion = shiritoriWords[lastChar];
      } else {
        isValidShiritori = false;
        nextWordSuggestion = "ひらがなで打ってね^^";
      }
    }
  }

  res.render("shiritori", { word: word, nextWord: nextWordSuggestion, valid: isValidShiritori, gameOver: gameOver });
});

// メッセージジェネレーター機能
app.get("/message", (req, res) => {
  const text = req.query.text || "";
  const type = req.query.type || "やさしく";
  let responseMessage = "";

  if (type === "罵倒する") {
    responseMessage = `あんたの文章、ひどすぎるわ！${text.length}文字も無駄にしたわ！`;
  } else {
    responseMessage = `すごいね！${text.length}文字も使って素敵な文章を書けたね！`;
  }

  res.render("message", { text: text, type: type, message: responseMessage });
});


// サーバー起動
app.listen(8080, () => console.log("Example app listening on port 8080!"));
