<template>
<div class="admin">
  <h1>Client Portal</h1>
  <button class="pure-button pure-button-primary" @click="showAddClientModal">Add Client</button>
  <h2>Clients</h2>
  <div class="client" v-for="client in clients" :key="client._id" @click="selectClient(client)">
    <h3>{{client.name}}</h3>
    <p>{{client.address}}</p>
    <p>{{client.phone}}</p>
  </div>

  <!-- Add Client Modal -->
  <transition v-if="showAddClient" name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">
          <form class="pure-form pure-form-aligned" @submit.prevent="addClient">
            <fieldset>
              <legend>Add a client</legend>
              <div class="pure-control-group">
                <label for="name">Name</label>
                <input id="name" v-model="clientName" placeholder="Name">
              </div>
              <div class="pure-control-group">
                <label for="address">Address</label>
                <input id="addres" v-model="clientAddress" placeholder="Address">
              </div>
              <div class="pure-control-group">
                <label for="phone">Phone</label>
                <input id="phone" v-model="clientPhone" placeholder="Phone">
              </div>
              <div class="pure-controls">
                <button type="button" @click="closeAddClientModal" class="pure-button">Close</button>

                <button type="submit" class="pure-button pure-button-primary">Add Client</button>
              </div>
            </fieldset>
          </form>
          <p v-if="error" class="error">{{error}}</p>
        </div>
      </div>
    </div>
  </transition>

  <!-- View Client Modal -->
  <transition v-if="showViewClient" name="modal">
    <div class="modal-mask">
      <div class="modal-wrapper">
        <div class="modal-container">
          <h1 class="modal-title">Client</h1>
          <div class="client">
            <h3>{{client.name}}</h3>
            <p>{{client.address}}</p>
            <p>{{client.phone}}</p>
          </div>
          <p v-if="pets.length > 0">Pets:</p>
          <ul class="pets">
            <li class="pet" v-for="pet in pets" :key="pet._id">
              {{pet.name}}, {{pet.type}}
            </li>
          </ul>
          <p v-if="error" class="error">{{error}}</p>
          <form class="pure-form pure-form-aligned" @submit.prevent="addPet(client)">
            <fieldset>
              <legend class="addPet">Add a pet</legend>
              <div class="pure-control-group">
                <label>Pet name</label>
                <input v-model="petName" placeholder="Name">
              </div>
              <div class="pure-control-group">
                <label>Type of pet</label>
                <input v-model="petType" placeholder="Type">
              </div>
              <div class="pure-controls">
                <button type="button" @click="closeViewClientModal" class="pure-button">Close</button>
                <button type="submit" class="pure-button pure-button-primary">Add Pet</button>
              </div>
            </fieldset>
          </form>
        </div>
      </div>
    </div>
  </transition>
</div>
</template>

<script>
import axios from 'axios';
export default {
  name: "Admin",
  data() {
    return {
      clients: [],
      client: null,
      pets: [],
      showAddClient: false,
      showViewClient: false,
      clientName: '',
      clientAddress: '',
      clientPhone: '',
      petName: '',
      petType: '',
      error: ''
    }
  },
  created() {
    this.getClients();
  },
  methods: {
    showAddClientModal() {
      this.clientName = '';
      this.clientAddress = '';
      this.clientPhone = '';
      this.error = '';
      this.showAddClient = true;
    },
    closeAddClientModal() {
      this.showAddClient = false;
    },
    showViewClientModal() {
      this.petName = '';
      this.petType = '';
      this.error = '';
      this.showViewClient = true;
    },
    closeViewClientModal() {
      this.showViewClient = false;
      this.pets = [];
    },
    selectClient(client) {
      this.client = client;
      this.getPets(client);
      this.showViewClientModal();
    },
    async getClients() {
      try {
        let response = await axios.get("/api/clients");
        this.clients = response.data;
      } catch (error) {
        console.log(error);
      }
    },
    async getPets(client) {
      try {
        let response = await axios.get("/api/clients/" + client._id + "/pets");
        this.pets = response.data;
      } catch (error) {
        console.log(error);
      }
    },
    async addClient() {
      try {
        await axios.post("/api/clients", {
          name: this.clientName,
          address: this.clientAddress,
          phone: this.clientPhone
        });
        this.closeAddClientModal();
        this.getClients();
      } catch (error) {
        console.log(error);
        this.error = error.response.data.message;
      }
    },
    async addPet(client) {
      try {
        await axios.post("/api/clients/" + client._id + "/pets", {
          name: this.petName,
          type: this.petType,
        });
        this.petName = '';
        this.petType = '';
        this.error = '';
        this.getPets(client);
      } catch (error) {
        console.log(error);
        this.error = error.response.data.message;
      }

    }
  }
}
</script>

<style scoped>
.admin {
  padding: 0px 100px;
}

/* Clients */
.client {
  background-color: #eee;
  padding: 10px;
  margin-bottom: 10px;
}

.client:hover {
  background-color: #ccc;
  cursor: pointer;
}

/* Modals */
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, .5);
  display: table;
  transition: opacity .3s ease;
}

.modal-wrapper {
  display: table-cell;
  vertical-align: middle;
}

.modal-container {
  width: 500px;
  margin: 0px auto;
  padding: 20px 30px;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, .33);
  transition: all .3s ease;
  font-family: Helvetica, Arial, sans-serif;
}

.modal-header h1 {
  margin-bottom: 30px;
  font-size: 1.5em;
}

/*
  * The following styles are auto-applied to elements with
  * transition="modal" when their visibility is toggled
  * by Vue.js.
  *
  * You can easily play with the modal transition by editing
  * these styles.
  */
.modal-enter {
  opacity: 0;
}

.modal-leave-active {
  opacity: 0;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}

form {
  font-size: 14px;
}

form legend {
  font-size: 20px;
}

.addPet {
  font-size: 16px;
}

input {
  margin-right: 10px;
  margin-bottom: 10px;
  width: 200px;
}

error {
  margin-top: 20px;
  display: inline;
  padding: 5px 20px;
  border-radius: 30px;
  font-size: 10px;
  background-color: #d9534f;
  color: #fff;
}

button {
  margin-right: 20px;
}

.modal-container h1 {
  font-size: 20px;
  border-bottom: 1px solid #3c8cbc;
}

h3 {
  font-size: 16px;
  font-weight: normal;
}

.pets {
  margin-bottom: 20px;
}
</style>
