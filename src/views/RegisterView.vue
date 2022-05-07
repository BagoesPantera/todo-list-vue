<script setup>
import { reactive, watch } from 'vue';
import { RouterLink } from 'vue-router';
import apiFetch from '../api/api';
import {showLoading, Swalclose, swalAlert} from "@/entities/swal.entity";
import  router from "../router";

const formData = reactive({
  email: "",
  password: "",
  confirmPassword: "",
})

async function login() {
    try {
      showLoading();
      const response = await apiFetch("/auth/login", {
        method: "POST",
        body: {
          email: formData.email,
          password: formData.password,
        },
      });
      console.log(response);
      localStorage.setItem("token", response.token);
      Swalclose();
      router.push('/');
    } catch (err) {
      swalAlert("error", err.data.message || "Login gagal !");
       router.push('/login');
    }
  } 

async function register() {
  if (formData.password === formData.confirmPassword) {
    try {
      showLoading();
      const response = await apiFetch("/auth/register", {
        method: "POST",
        body: {
          email: formData.email,
          password: formData.password,
        },
      });
      Swalclose();
      login();
    } catch (err) {
      swalAlert("error", err.data.message);
    }
  } else {
    swalAlert("warning", "Password doesnt match!");
  }
}

</script>

<template>
<div style="height: 100vh">
  <form class="d-flex flex-column justify-content-center align-items-center h-100" @submit.prevent  ="register">
    <h3 class="mb-4">Register Simple ToDo List</h3>
    <input id="register_email" type="email" class="form-control w-25 mb-3" placeholder="name@example.com" v-model = "formData.email" />
    <input id="register_password" type="password" class="form-control w-25 mb-3" placeholder="password" v-model = "formData.password" />
    <input id="confirm_register_password" type="password" class="form-control w-25 mb-2" placeholder="confirm password" v-model = "formData.confirmPassword" />
    <small>
      <router-link to="/login">Already have an account? Login here</router-link>
    </small>
    <button id="registerBtn" type="submit" class="btn btn-secondary mt-4">
      <b>REGISTER</b>
    </button>
  </form>
  </div>
</template>
