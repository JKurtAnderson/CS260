<template>
<div id="app">
  <b-container id="app">
    <b-row>
      <b-col>
        <navbar />
      </b-col>
    </b-row>
    <b-row>
      <b-col>
        <router-view />
      </b-col>
    </b-row>
  </b-container>
    <div class='footer'>
      <div class='footer-item footer-one'><a href="https://github.com/JKurtAnderson/CS260/tree/master/team-picker"><img src="https://tettra.co/wp-content/uploads/2019/03/integrations-github-logo.png"></a></div>
      <div class='footer-item footer-two'><img src="https://logodownload.org/wp-content/uploads/2014/09/facebook-logo-4.png"></div>
      <div class='footer-item footer-two'><img src="https://lh3.googleusercontent.com/proxy/1kdxAoowW-iCvPcoLLpSgdf3S3Wd3coySdT8FJIDygNhCqvtp_QNeI_u4-nhh9nBJ_BKoGvKvCaIimGEgihMsfiwsmrLWgMspj5Rb6ZrORJZSQ8MUkTIlFkSnLHI"></div>
      <div class='footer-item footer-two'><img src="https://i.ya-webdesign.com/images/logo-twitter-png.png"></div>
    </div>
</div>
</template>

<script>
import Navbar from './components/Navbar';

export default {
  name: 'App',
  components: {
    Navbar
  }
};
</script>

<style>
* {
  box-sizing: border-box;
}

body {
  margin: 0px;
  background-color: #f9f9f9;
  background-image: url("https://cdn.inspirationhut.net/wp-content/uploads/2013/05/81.png");
}

.row {
  background-color: white;
  border-left: 1px solid #333;
  border-right: 1px solid #333;
}
.row:last-child {
border-bottom: 1px solid #333;
}

#menu {
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-column-gap: 5px;
  grid-template-areas: "none brand side";
  margin-bottom: 50px;
}

#menu a {
  color: #B84901;
}

#brand {
  grid-area: brand;
  display: flex;
  justify-content: center;
}

#brand img {
  height: 200px;
}

#side {
  grid-area: side;
  display: flex;
  justify-content: flex-end;
}

#side img {
  width: 50px;
}

.menu-item {
  display: flex;
  flex-direction: column;
}

.menu-item p {
  margin: 0px;
}

.browse {
  margin-right: 50px;
}

h1 {
  font-family: 'Sen', sans-serif;
  text-align: center;
}

.footer {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  margin-top: 50px;
}

.footer-item {
  height: 30px;
  flex: 1;
  display: block;
  text-align: center;
}

.footer img {
  width: 150px;
  height: auto;
}

/* Mobile Styles */
@media only screen and (max-width: 600px) {
  .footer {
    flex-direction: column;
  }
}
</style>
