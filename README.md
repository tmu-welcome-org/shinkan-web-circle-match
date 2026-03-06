# 新歓Web用「サークル紹介Web」

このリポジトリは，中央新歓運営の新歓Web(https://shinkan.tmuzc.org)で使用される「サークル紹介Web」のソースコードです．

## サークル紹介Webとは

サークル紹介Webは中央新歓が提供する新歓Webの一部で，サークルの情報を掲載するためのWebアプリです。

各サークルの基本情報や活動内容・連絡先などを掲載し，新入生がサークルを探しやすくすることを目的としています．

## 基本設計

Github Pagesで公開するため，すべてクライアントサイドで完結させる設計としています．

サークルの情報は `./circle_data` ディレクトリに格納され，この中身を入れ替えることによりサークル情報の更新を行っています.



## 掲載希望

その年の新歓ドキュメントをご覧ください。
（参考：[新歓ドキュメント2026](https://tmu-shinkan-doc.notion.site/2b6b9cf33d258195b1f3e3cbca955664?v=2b6b9cf33d2581c58f35000ca6df71b4&pvs=74)）

## 使用技術

- React + Vite + Tailwind CSS

## 環境構築

```bash
npm install 

# Run in development mode 
# --host オプションにより，ローカルネットワーク上の他の端末からもアクセス可能になっています．
npm run dev 

# Build => ./dist
npm run build
```

## Contact/Feedback

本アプリに関するお問い合わせやフィードバックは，以下のフォームまでお願いいたします．（こちらに掲載の申請はしないでください．）

[お問い合わせフォーム](https://forms.gle/srvu7ibxUj5a5DhWA)
