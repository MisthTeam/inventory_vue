<template>
  <div
    class="modal fade"
    id="exampleModal"
    tabindex="-1"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
    @click="close"
  >
    <div class="modal-dialog modal-dialog-centered modal-lg" @click.stop>
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
          <slot>
            <p>Здесь форма</p>
          </slot>
        </div>
        <div class="modal-footer">
          <slot name="footer" :close="close" :ok="confirm">
            <button
              type="button"
              class="btn btn-secondary"
              data-bs-dismiss="modal"
              @click="$emit('close')"
            >
              Отмена
            </button>
            <button
              type="button"
              class="btn btn-success"
              data-bs-dismiss="modal"
              @click="$emit('ok')"
            >
              Сохранить
            </button>
          </slot>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
defineProps({
  isOpen: {
    type: Boolean,
    required: false,
    default: false,
  },
  name: {
    type: String,
    required: false,
    default: "Модалка",
  },
});

const emit = defineEmits({
  close: null,
  ok: null,
});

const close = () => emit("close");
const confirm = () => emit("ok");
</script>

<script>
export default {
  name: "BaseModal",
};
</script>
