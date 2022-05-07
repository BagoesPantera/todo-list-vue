<script setup>
import apiFetch from '../api/api';
import { reactive, ref } from "vue";
import {showLoading, Swalclose, swalAlert} from "@/entities/swal.entity";
import  router from "../router"

let datas = ref('');

const addData = reactive({
  title:"",
  description:"",
})

const updateData = reactive({
  id:"",
  title:"",
  description:"",
})

async function getData(){
  try {
    const todos = await apiFetch("/todo", {
      method: "GET",
      headers: {
        Authorization: `${localStorage.getItem("token")}`,
        Accept: "application/json",
      },}
    );
    datas.value = todos;
  } catch (error) {
    console.log(error);
  }
}
getData()

async function todoAdd() {
  try {
    showLoading();
    const response = await apiFetch("/todo/add", {
      method: "POST",
      headers: {
        Authorization: `${localStorage.getItem("token")}`,
        Accept: "application/json",
      },
      body: {
        title: addData.title,
        description: addData.description,
      },
    });
    getData();
    addData.title = "";
    addData.description = "";
    Swalclose();
  } catch (error) {
    swalAlert("error", err.data.message || "Tambah todo gagal !");
  }
}

async function getOneTodo(id) {
  try {
    const response = await apiFetch(`/todo/${id}`, {
      method: "GET",
      headers: {
        Authorization: `${localStorage.getItem("token")}`,
        Accept: "application/json",
      },
    });
    updateData.id = response.id;
    updateData.title = response.title;
    updateData.description = response.description;
  } catch (error) {
    console.log(error);
  }
}

async function todoUpdate(id) {
  try {
    showLoading();
    const response = await apiFetch(`/todo/update/${id}`, {
      method: "POST",
      headers: {
        Authorization: `${localStorage.getItem("token")}`,
        Accept: "application/json",
      },
      body: {
        title: updateData.title,
        description: updateData.description,
      },
    });
    getData();
    updateData.id = "";
    updateData.title = "";
    updateData.description = "";
    document.getElementById('close').click();
    Swalclose();
  } catch (error) {
    swalAlert("error",  "Update todo gagal !");
  }
}

async function todoDelete(id){
  try {
    showLoading();
    const response = await apiFetch(`todo/delete/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `${localStorage.getItem("token")}`,
        Accept: "application/json",
      },
    });
    getData();
    Swalclose();
  } catch (error) {
    swalAlert("error", error.data.message || "Hapus todo gagal !");
  }
}
function logout() {
  localStorage.clear();
  router.push('/login');
}
</script>

<template>
  <div class="m-auto">
    <div class="container-sm">
      <div class="row">
        <h5 class="text-center my-4">Simple ToDo List</h5>


        <form @submit.prevent="todoAdd">
          <div class="form-group">
            <label for="exampleInputEmail1">Title</label>
            <input 
            type="text" 
            class="form-control" 
            id="exampleInputEmail1" 
            aria-describedby="emailHelp"
            v-model = "addData.title"
            required
            />
          </div>
          <div class="form-group">
            <label for="exampleFormControlTextarea1">Description</label>
            <textarea 
            class="form-control" 
            id="exampleFormControlTextarea1" 
            rows="3"
            v-model = "addData.description"
            required
            ></textarea>
          </div>
          <button type="submit" class="btn btn-primary mt-2">Submit</button>
        </form>

        <div class="p-0" id="base_container">
          <p class="mt-4 mx-2 mb-0 p-0"><small>Upcoming</small></p>
          <div id="todo_list_container" class="my-1 g-0">
            <!-- Start Component card -->
            <div class="card" v-for="data in datas">
              <div class="card-body">
                <h5 class="card-title">{{data.title}}</h5>
                <p class="card-text">{{data.description}}</p>
                <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal" @click="getOneTodo(data.id)">Edit</button>
                <button class="btn btn-danger" @click="todoDelete(data.id)">Delete</button>
              </div>
            </div>
            <!-- End Component card -->
          </div>

          <!-- Update Modal -->
          <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div class="modal-dialog">
              <div class="modal-content">
                <div class="modal-header">
                  <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
                  <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" id="close"></button>
                </div>
                <div class="modal-body">
                  <form @submit.prevent="todoUpdate(updateData.id)">
                    <div class="form-group">
                      <label for="exampleInputEmail1">Title</label>
                      <input 
                      type="text" 
                      class="form-control" 
                      id="exampleInputEmail1" 
                      aria-describedby="emailHelp"
                      v-model = "updateData.title"
                      required
                      />
                    </div>
                    <div class="form-group">
                      <label for="exampleFormControlTextarea1">Description</label>
                      <textarea 
                      class="form-control" 
                      id="exampleFormControlTextarea1" 
                      rows="3"
                      v-model = "updateData.description"
                      required
                      ></textarea>
                    </div>
                    <button type="submit" class="btn btn-primary mt-2">Submit</button>
                  </form>
                </div>
              </div>
            </div>
          </div>
          <!-- End Update Modal -->

          <div class="col-12 py-4">
            <button id="logout_button" class="btn btn-danger w-100" @click="logout">
              Log Out
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.container-custom {
  width: 330px;
  padding-right: var(--bs-gutter-x, 0.75rem);
  padding-left: var(--bs-gutter-x, 0.75rem);
  margin-right: auto;
  margin-left: auto;
}
</style>