<template>
<div class="main">
  <div v-if="selectedPhoto" class="photo">
    <img :src="selectedPhoto.path" />
    <h3>Created: {{formatDate(selectedPhoto.created)}}</h3>
  </div>
</div>
</template>

<script>
import axios from 'axios';
import moment from 'moment';
export default {
  name: 'photo',
  data() {
    return {
      selectedPhoto: null,
      comments: null,
      comment: "",
      creating: true,
    }
  },
  async created() {
    this.getPhoto();
  },
  computed: {
    user() {
      return this.$root.$data.user;
    }
  },
  methods: {
    toggleForm() {
      this.creating = !this.creating;
    },
    async getPhoto() {
      try {
        let response = await axios.get("/api/memes/" + this.$route.params.id);
        this.selectedPhoto = response.data;
      } catch (error) {
        this.error = error.response.data.message;
      }
    },
    formatDate(date) {
      if (moment(date).diff(Date.now(), 'days') < 15)
        return moment(date).fromNow();
      else
        return moment(date).format('d MMMM YYYY');
    },
  },
}
</script>

<style scoped>
.photo {
  padding-top: 150px;
  text-align: center;
}

h1 {
  color: black;
  font-size: 36px;
}

h2 {
  font-size: 24px;
}

h3 {
  font-size: 22px;
  font-style: italic;
}
</style>
