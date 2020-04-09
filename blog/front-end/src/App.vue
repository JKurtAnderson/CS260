<template>
<div id="app">
  <div class="header">
    <router-link to="/">
      <div class="logo">
        <img src="/JA.png" height="100px">
      </div>
    </router-link>
    <div class="title">
      <h1>Blog of Jason Anderson</h1>
    </div>
  </div>
  <div class="content">
    <router-view />
  </div>
  <div class="push"></div>
  <div class="footer">
    <router-link to="/admin">Admin</router-link>
    <p><a href="https://github.com/JKurtAnderson/CS260/tree/master/blog">GitHub</a></p>
  </div>
</div>
</template>

<script>
document.title = "Blog of Jason Anderson"
</script>

<style>
html {
  box-sizing: border-box;
}

html, body {
  height: 100%;
  margin: 0;
}

body {
  font-family: 'Montserrat', sans-serif;
  font-size: 16px;
  background: #fff;
  padding: 0px;
  margin: 0px;
  background-color: #f9f9f9;
  background-image: url("https://cdn.inspirationhut.net/wp-content/uploads/2013/05/81.png");
  height: 100%;
}

.page {
  width: 80%;
  margin: auto;
  background-color: #fdfdfd;
  border-style: solid;
  border-width: 1px;
  border-color: grey;
  padding: 50px;
}

/* Header */
.header {
  display: flex;
  padding: 10px 100px 0px 100px;
  background-color: #71ea67;
  color: #1C454F;
}

.title {
  margin-top: 5px;
}

.title h1 {
  font-size: 30px;
}

.content {
  padding: 20px 100px;
  min-height: calc(100vh - 225px);
  margin-bottom: -50px;
}

/* Footer */
.footer {
  height: 50px;
  padding: 20px 100px 0px 100px;
  background: #71ea67;
  font-size: 12px;
}

.push {
  height: 50px;
}

.footer a {
  color: #000;
}

h1 {
  font-size: 20px;
}

h2 {
  font-size: 14px;
}
</style>
