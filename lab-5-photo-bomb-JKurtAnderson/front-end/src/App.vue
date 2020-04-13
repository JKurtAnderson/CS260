<template>
  <div id="app">
    <header id="header">
      <h1>Photo Bomb</h1>
      <nav>
        <router-link to="/"><i class="fas fa-home"></i></router-link>
        <router-link to="/dashboard"><i class="fas fa-user"></i></router-link>
      </nav>
    </header>
    <div class="content">
      <router-view />
    </div>
    <div class="push"></div>
    <div class="footer">
      <p><a href="https://github.com/JKurtAnderson/CS260/tree/master/lab-5-photo-bomb-JKurtAnderson">GitHub</a></p>
    </div>
  </div>
</template>

<style>
/* Color scheme: https://paletton.com/#uid=7040u0knHs+edG7jrvYscpiuCk2 */
/* red: #e74c3c
 * blue: #277E8E
 */
body {
  font-family: 'Work Sans', sans-serif;
  font-weight: 300;
  font-size: 13pt;
  margin: 0px 200px;
}

html, body {
  height: 100%;
}

#header {
  /* Semi-circle */
  margin: 0 1em 1em 0;
  height: 100px;
  width: 200px;
  border-bottom-left-radius: 200px;
  border-bottom-right-radius: 200px;
  /* Fixed position */
  position: fixed;
  z-index: 10000;
  left: 50%;
  transform: translate(-50%, 0);
  /* Color and alignment */
  background: #e74c3c;
  text-align: center;
  box-shadow: 0 0 0 1em #FFF;
}

nav {
  display: flex;
  justify-content: center;
}

h1 {
  color: #fff;
  font-size: 18px;
}

h2 {
  font-size: 12px;
}
.content {
  padding: 20px 100px;
  min-height: calc(100vh - 110px);
  margin-bottom: -50px;
}

/* Footer */
.footer {
  height: 50px;
  margin-left: -200px;
  margin-right: -200px;
  width: calc(100% + 200px);
  padding: 20px 100px 0px 100px;
  background: #e74c3c;
  font-size: 24px;
}

.push {
  height: 50px;
}

.footer a {
  color: white;
}

.footer p {
  margin-top: 10px;
}

#header .fas {
  font-size: 25px;
  color: #fff;
  width: 50px;
}

.pure-button-primary {
  background-color: #277E8E;
}
</style>
