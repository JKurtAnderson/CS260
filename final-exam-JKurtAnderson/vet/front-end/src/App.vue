<template>
<div id="app">
  <div class="bar">
    <h1>Your Best Friends</h1>
    <p>a family veterinarian</p>
    <div class="contact">
      <div class="hours">
        Open Monday through Saturday, 9:00am to 7:00pm
      </div>
      <div class="phone">
        800-123-4567
      </div>
    </div>
    <div class="pure-menu pure-menu-horizontal">
      <ul class="pure-menu-list">
        <li class="pure-menu-item"><a href="/" class="pure-menu-link">Home</a></li>
        <li class="pure-menu-item"><a href="/" class="pure-menu-link">Services</a></li>
        <li class="pure-menu-item"><a href="/" class="pure-menu-link">Staff</a></li>
        <li class="pure-menu-item">
          <router-link class="pure-menu-link" to="/admin">Admin</router-link>
        </li>
      </ul>
    </div>
  </div>
  <router-view />
</div>
</template>

<style>
/* colors
 * steel blue: #3c8cbc
 * dark slate gray: #213651
 * light steel blue: #99a9c8
 * dim gray: #594853
 * cadet blue: #594853
 * gray: #303740
 */
body {
  margin: 0px;
  padding: 0px;
  font-family: 'Raleway';
  letter-spacing: 0.05em;
}

.bar {
  margin: 0px;
  padding: 0px;
  padding-top: 10px;
  text-align: center;
  background-color: #213651;
  background-color: #303740;
  height: 250px;
  color: white;
}

.bar h1 {
  font-family: "Patrick Hand";
  margin: 0px;
  padding: 0px;
  padding-top: 5px;
}

.bar p {
  margin: 0px;
  padding: 0px;
  text-transform: uppercase;
  font-size: 0.8em;
  letter-spacing: 0.3em;
}

.contact {
  display: flex;
  justify-content: space-around;
  background-color: #3c8cbc;
  margin-top: 20px;
  margin-bottom: 20px;
  color: white;
  line-height: 40px;
}

.pure-menu {
  background: #303740;
  margin-bottom: 10px;
}

.pure-menu-list {
  width: 100%;
}

.pure-menu-link {
  color: #fff;
  border-bottom: 2px solid #303740;
}

.pure-menu-active>.pure-menu-link,
.pure-menu-link:focus,
.pure-menu-link:hover {
  border-bottom: 2px solid #eee;
  border-bottom: 2px solid #3c8cbc;
  background: none;
}

.footer {
  margin-top: 50px;
  line-height: 40px;
  background-color: #594853;
  padding: 0px 100px;
}

a {
  color: #fff;
}

.pure-button-primary {
  background-color: #3c8cbc;
}
</style>
