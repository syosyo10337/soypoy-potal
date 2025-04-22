#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const https = require('https');
require('dotenv').config();

// 環境変数からAPIキーを取得
const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

if (!apiKey) {
  console.error('Google Maps APIキーが設定されていません。.envファイルを確認してください。');
  process.exit(1);
}

// SOY-POYの住所と座標
const address = encodeURIComponent('渋谷区神宮前6丁目14-2');
const latitude = 35.662875072593145;
const longitude = 139.66509847550185;

// 地図のパラメータ
const zoom = 16;
const width = 1200;
const height = 800;
const scale = 2; // 高解像度（Retinaディスプレイ対応）

// 画像の保存先
const outputDir = path.join(__dirname, '../public/images');
const outputFile = path.join(outputDir, 'soypoy-map.png');

// Google Maps Static APIのURL構築
const url = `https://maps.googleapis.com/maps/api/staticmap?center=${latitude},${longitude}&zoom=${zoom}&size=${width}x${height}&scale=${scale}&markers=color:red|${latitude},${longitude}&key=${apiKey}`;

// 出力ディレクトリが存在しない場合は作成
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

https.get(url, (response) => {
  if (response.statusCode !== 200) {
    console.error(`エラー: ステータスコード ${response.statusCode}`);
    response.resume();
    return;
  }

  const file = fs.createWriteStream(outputFile);
  response.pipe(file);

  file.on('finish', () => {
    file.close();
  });
}).on('error', (err) => {
  console.error(`ダウンロード中にエラーが発生しました: ${err.message}`);
});
