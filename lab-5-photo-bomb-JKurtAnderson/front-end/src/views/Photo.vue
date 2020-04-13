<template>
<div class="main">
  <div v-if="selectedPhoto" class="photo">
    <h1>{{selectedPhoto.title}}</h1>
    <h2>{{selectedPhoto.description}}</h2>
    <img :src="selectedPhoto.path" />
    <h3>Created: {{formatDate(selectedPhoto.created)}} by {{selectedPhoto.user.username}}</h3>
  </div>

  <div>
    <h2>Comments</h2>
    <div v-for="currentComment in comments" v-bind:key="currentComment.id">
      <hr>
      <div class="ticket">
        <div class="problem">
          <p>{{currentComment.comment}}</p>
          <p><i>-- {{currentComment.user.username}} {{formatDate(currentComment.created)}}</i></p>
        </div>
      </div>
    </div>
  </div>

  <div v-if="user">
    <h2>Make a Comment</h2>
    <form v-if="creating" @submit.prevent="postComment">
      <textarea v-model="comment" rows="4" cols="50"></textarea>
      <br />
      <button type="submit">Submit</button>
    </form>
    <div v-else>
      <p>Thank you for your comment!</p>
      <p><a @click="toggleForm" href="#">Submit another comment</a></p>
    </div>
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
    this.getComments();
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
        let response = await axios.get("/api/photos/" + this.$route.params.id);
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
    async postComment() {
      try {
        await axios.post("/api/comments", {
          user: this.user,
          comment: this.comment,
          photo: this.selectedPhoto,
        });
        this.comment = "";
        this.creating = false;
        this.getComments();
        return true;
      } catch (error) {
        console.log(error);
      }
    },
    async getComments() {
      try {
        let response = await axios.get("/api/comments/" + this.$route.params.id);
        this.comments = response.data;
        return true;
      } catch (error) {
        console.log(error);
      }
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
