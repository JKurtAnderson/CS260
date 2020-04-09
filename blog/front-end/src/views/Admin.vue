<template>
<div class="page">
  <h1>The Admin Page!</h1>
  <div class="heading">
    <div class="circle">1</div>
    <h2>Create a blog post!</h2>
  </div>
  <div class="add">
    <div class="form">
      <input v-model="title" placeholder="Title">
      <p></p>
      <textarea v-model="post" placeholder="What's on your mind?" rows="4" cols="50"></textarea>
      <p></p>
      <button @click="upload">Post</button>
    </div>
    <div class="upload" v-if="addItem">
      <h2>{{addItem.title}} posted!</h2>
    </div>
  </div>
  <div class="heading">
    <div class="circle">2</div>
    <h2>Edit/Delete an Item</h2>
  </div>
  <div class="edit">
    <div class="form">
      <input v-model="findTitle" placeholder="Search">
      <div class="suggestions" v-if="suggestions.length > 0">
        <div class="suggestion" v-for="s in suggestions" :key="s.id" @click="selectItem(s)">{{s.title}}
        </div>
      </div>
    </div>
    <div class="upload" v-if="findItem">
      <input v-model="findItem.title">
      <p></p>
      <textarea v-model="findItem.post" rows="4" cols="50"></textarea>
    </div>
    <div class="actions" v-if="findItem">
      <button @click="deleteItem(findItem)">Delete</button>
      <button @click="editItem(findItem)">Edit</button>
    </div>
  </div>

  <div v-if="findComments">
    <h1>Comments</h1>
    <div v-for="comment in findComments" v-bind:key="comment.id">
      <hr>
      <div class="ticket">
        <div class="problem">
          <p>{{comment.comment}}</p>
          <p><i>-- {{comment.name}} on {{comment.date}}</i></p>
        </div>
        <button @click="deleteComment(comment)">Delete</button>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'Admin',
  computed: {
    suggestions() {
      let items = this.items.filter(item => item.title.toLowerCase().startsWith(this.findTitle.toLowerCase()));
      return items.sort((a, b) => a.title > b.title);
    }
  },
  data() {
    return {
      title: "",
      post: "",
      addItem: null,
      items: [],
      findTitle: "",
      findItem: null,
      findComments: null,
    }
  },
  created() {
    this.getItems();
  },
  methods: {
    async upload() {
      try {
        let r1 = await axios.post('/api/posts', {
          title: this.title,
          post: this.post
        });
        this.addItem = r1.data;
      } catch (error) {
        console.log(error);
      }
    },
    async getItems() {
      try {
        let response = await axios.get("/api/posts");
        this.items = response.data;
        this.getItems();
        return true;
      } catch (error) {
        console.log(error);
      }
    },
    async getComments() {
      if(this.findItem == null) {
        this.findComments = null;
        return true;
      }
      try {
        let response = await axios.get("/api/comments/" + this.findItem._id);
        if (response.data.length > 0) this.findComments = response.data;
        else this.findComments = null;
        return true;
      } catch (error) {
        console.log(error);
      }
    },
    selectItem(item) {
      this.findTitle = "";
      this.findItem = item;
      this.getComments();
    },
    async deleteItem(item) {
      try {
        await axios.delete("/api/posts/" + item._id);
        await this.findComments.forEach(comment => axios.delete("/api/comments/" + comment._id));
        this.findItem = null;
        this.getItems();
        this.getComments();
        return true;
      } catch (error) {
        console.log(error);
      }
    },
    async deleteComment(comment) {
      try {
        await axios.delete("/api/comments/" + comment._id);
        this.getComments();
        return true;
      } catch (error) {
        console.log(error);
      }
    },
    async editItem(item) {
      try {
        await axios.put("/api/posts/" + item._id, {
          title: this.findItem.title,
          post: this.findItem.post,
        });
        this.findItem = null;
        this.getItems();
        this.getComments();
        return true;
      } catch (error) {
        console.log(error);
      }
    },
  },
}
</script>

<style scoped>
.image h2 {
  font-style: italic;
  font-size: 1em;
}

.heading {
  display: flex;
  margin-bottom: 20px;
  margin-top: 20px;
}

.heading h2 {
  margin-top: 8px;
  margin-left: 10px;
}

.add,
.edit {
  display: flex;
}

.circle {
  border-radius: 50%;
  width: 18px;
  height: 18px;
  padding: 8px;
  background: #333;
  color: #fff;
  text-align: center
}

/* Form */
input,
textarea,
select,
button {
  font-family: 'Montserrat', sans-serif;
  font-size: 1em;
}

.form {
  margin-right: 50px;
}

/* Uploaded images */
.upload h2 {
  margin: 0px;
}

.upload img {
  max-width: 300px;
}

/* Suggestions */
.suggestions {
  width: 200px;
  border: 1px solid #ccc;
}

.suggestion {
  min-height: 20px;
}

.suggestion:hover {
  background-color: #5BDEFF;
  color: #fff;
}
</style>
