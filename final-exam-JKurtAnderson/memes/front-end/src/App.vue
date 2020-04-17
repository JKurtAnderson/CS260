<template>
<div id="app">
  <div class="pure-menu pure-menu-horizontal">
    <span class="pure-menu-heading">Memes</span>
    <ul class="pure-menu-list">
      <li class="pure-menu-item">
        <router-link to="/" class="pure-menu-link">Home</router-link>
      </li>
      <li class="pure-menu-item">
        <p><a @click="toggleUpload"><i class="fas fa-image"></i></a></p>
      </li>
    </ul>
  </div>
  <div class="content">
    <uploader :show="show" @close="close" @uploadFinished="uploadFinished" />
    <router-view />
  </div>
</div>
</template>

<script>
import Uploader from '@/components/Uploader.vue';

export default {
  name: 'home',
  components: {
    Uploader,
  },
  data() {
    return {
      show: false,
    }
  },
  methods: {
    close() {
      this.show = false;
    },
    toggleUpload() {
      this.show = true;
    },
    async uploadFinished() {
      this.show = false;
      this.getPhotos();
    },
  }
}
</script>

<style>
body {
  font-size: 16px;
  padding: 20px 100px 0px 100px;
}

/* Menu */
.pure-menu-horizontal {
  border-bottom: 2px solid;
}

.pure-menu-disabled,
.pure-menu-heading,
.pure-menu-link {
  padding: .5em 1em .5em 0em;
}

.pure-menu-active>.pure-menu-link,
.pure-menu-link:focus,
.pure-menu-link:hover {
  background-color: inherit;
}

.content {
  margin-top: 20px;
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
