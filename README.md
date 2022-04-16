
<div align="center">
  <a href="https://github.com/ayugioh2003/metawallBackend">
    <img src="./logo.png" alt="Logo" width="80" height="80">
  </a>

  <h3 align="center">Meta Wall</h3>

  <p align="center">
    📗 貼文動態牆 API in Node.js
    <br />
    <a href="https://github.com/ayugioh2003/metawallBackend/issues">Report Bug</a>
    ·
    <a href="#">Demo</a>
  </p>
</div>

## 🛖 About This Project
此為 NFT 會員制的動態牆，僅有限量 VIP 可以加入討論，在 NFT 合約上，有限制永久只有 500 位會員參與此平台。此為六角 Nodejs 第二週小組任務

功能面
* 功能一：取得貼文列表 API
* 功能二：新增貼文 API

## 🔨 後端規格
- URL：http://localhost:3005

### Post Collection
- Collection: Post
- 時間資料庫存的形式以 Timestamp 為主
- 取得文章列表 API
  - GET: http://localhost:3005/posts
- 新增貼文 API
  - POST: http://localhost:3005/posts
  ``` js
  {
    // 發文者名稱 [必填]
     userName : string,
     // 發文內容 [必填]
     userContent: string,
     // 使用者圖片 [選填]
     userPhoto : string
  }
  ```

## 🔨 Built With
此專案會用到的 Framework / Library 或工具

* [Nodejs](https://github.com/nodejs)
* [Heroku](https://www.heroku.com/)
* [Git](https://git-scm.com/)
* [Nodemon](https://www.npmjs.com/package/nodemon)
* [Mongoose](https://mongoosejs.com/)
* [Vercel](https://vercel.com/)

## 👨‍💻 Getting Started
以下照著範例做，可以讓你在本地端 run 此專案

1. Clone the Repo
  ```sh
    git clone git@github.com:ayugioh2003/metawallBackend.git
  ```
2. Install NPM packages
  ```
  cd metawallBackend
  npm install
  ```
3. Copy .env.example to .env
  ```
  cp .env.example .env
  填上小組共用的 DATABASE、DATABASE_PASSWORD
  ```
4. Start Runing Server
  使用 Nodemon，存檔後會立即更新程式碼，不需重啟 nodejs
  ```
  npm run dev
  ```
