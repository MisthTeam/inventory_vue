<template>
  <div class="row justify-content-center">
    <div class="col-xl-4 col-lg-4 col-md-6 col-12 mt-2 text-center">
      <h4>Пользователи</h4>
    </div>
  </div>
  <div class="row justify-content-center">
    <div class="col-xl-5 col-lg-5 col-md-12 col-12 mt-2">
      <table class="table">
        <thead>
          <tr>
            <th scope="col">Username</th>
            <th scope="col">Email</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>misthntism</td>
            <td>cblpgamer@yandex.ru</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
<script setup></script>
<style scoped>
tbody tr:hover {
  background-color: #212529;
  color: white;
  cursor: pointer;
}
</style>
