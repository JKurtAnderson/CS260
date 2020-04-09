<template>
<div class="page">
  <div class="" v-if="posts">
    <h1>{{posts[number].title}}</h1>
    <h3>{{posts[number].date}}<span class="note" v-if="posts[number].edited"> - last updated: {{posts[number].edited}}</span></h3>
    <p><span style="white-space: pre-line">{{posts[number].post}}</span></p>
    <div class="center">
      <a href="#" class="previous" id="prevButton" @click="previous()">&laquo; Previous</a>
      <a href="#" class="next" id="nextButton" @click="next()">Next &raquo;</a>
    </div>

    <div>
      <h2>Comments</h2>
      <div v-for="currentComment in comments" v-bind:key="currentComment.id">
        <hr>
        <div class="ticket">
          <div class="problem">
            <p>{{currentComment.comment}}</p>
            <p><i>-- {{currentComment.name}} on {{currentComment.date}}</i></p>
          </div>
        </div>
      </div>
    </div>

    <div>
      <h2>Make a Comment</h2>
      <form v-if="creating" @submit.prevent="postComment">
        <input v-model="name" placeholder="Name">
        <p></p>
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
  <div v-else>
    <p>No posts.</p>
  </div>

</div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'Home',
  data() {
    return {
      posts: null,
      number: -1,
      creating: true,
      name: '',
      comment: '',
      comments: null,
    }
  },
  created() {
    this.getPosts();
  },
  methods: {
    toggleForm() {
      this.creating = !this.creating;
    },
    async postComment() {
      try {
        await axios.post("/api/comments", {
          name: this.name,
          comment: this.comment,
          post: this.posts[this.number]._id,
        });
        this.name = "";
        this.comment = "";
        this.creating = false;
        this.getComments();
        return true;
      } catch (error) {
        console.log(error);
      }
    },
    async getPosts() {
      try {
        let response = await axios.get("/api/posts");
        this.posts = response.data;
        this.number = 0;
        this.getComments();
        this.checkButtons();
        return true;
      } catch (error) {
        console.log(error);
      }
    },
    async getComments() {
      try {
        let response = await axios.get("/api/comments/" + this.posts[this.number]._id);
        this.comments = response.data;
        return true;
      } catch (error) {
        console.log(error);
      }
    },
    next() {
      if (this.number < this.posts.length - 1) {
        this.number++;
      }
      this.checkButtons();
      this.getComments();
      this.creating = true;
    },
    previous() {
      if (this.number > 0) {
        this.number--;
      }
      this.checkButtons();
      this.getComments();
      this.creating = true;
    },
    checkButtons() {
      let button = document.getElementById("nextButton");
      if (this.posts.length >= this.number + 1) {
        button.disabled = true;
      } else {
        button.disabled = false;
      }
      button = document.getElementById("prevButton");
      if (this.number <= 0) {
        button.disabled = true;
      } else {
        button.disabled = false;
      }
    }
  }
}
</script>

<style scoped>
h1 {
  font-size: 30px;
  text-align: center;
}

h3 {
  font-size: 20px;
  text-align: center;
}

.note {
  font-style: italic;
}

a {
  text-decoration: none;
  display: inline-block;
  padding: 8px 16px;
}

a:hover {
  background-color: #ddd;
  color: black;
}

.previous {
  background-color: #f1f1f1;
  color: black;
}

.next {
  background-color: #71ea67;
  color: black;
}

.next:hover {
  background-color: #38b56d;
}

.round {
  border-radius: 50%;
}

.image h2 {
  font-style: italic;
}

.center {
  margin-top: 30px;
  margin-bottom: 30px;
  margin: auto;
  width: 450px;
}

a+a {
  margin-left: 200px;
}

@media only screen and (min-width: 1024px) {}

@media only screen and (max-width: 1023px) and (min-width: 768px) {}

@media only screen and (max-width: 767px) and (min-width: 540px) {}
</style>
