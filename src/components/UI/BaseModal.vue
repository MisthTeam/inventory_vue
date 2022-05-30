<template>
  <div
    class="modal fade"
    id="exampleModal"
    tabindex="-1"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog modal-dialog-centered modal-lg">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">{{ name }}</h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <!-- форма -->
          <div class="form-floating mb-3">
            <input
              id="floatingInput2"
              type="text"
              class="form-control"
              value="KSDHDSFUH"
              placeholder="P/N"
            />
            <label for="floatingInput2">P/N</label>
          </div>
          <div class="input-group justify-content-between mb-3">
            <input type="text" required class="form-control" :value="123" />
            <input type="text" required class="form-control" :value="123" />
            <input type="text" required class="form-control" :value="123" />
          </div>
          <!-- конец формы -->
        </div>
        <div class="modal-footer">
          <slot name="footer" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  name: {
    type: String,
    required: false,
    default: "Модалка",
  },
});
</script>

<script>
export default {
  name: "BaseModal",
};
</script>
