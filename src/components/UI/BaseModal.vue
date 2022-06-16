<template>
  <teleport to="body">
    <div
      id="exampleModal"
      class="modal fade"
      tabindex="-1"
      aria-labelledby="exampleModalLabel"
      aria-hidden="true"
      @click="close"
    >
      <div class="modal-dialog modal-dialog-centered modal-lg" @click.stop>
        <div class="modal-content">
          <div class="modal-header">
            <h5 id="exampleModalLabel" class="modal-title">{{ name }}</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <slot>
              <p>Здесь форма</p>
            </slot>
          </div>
          <div class="modal-footer">
            <slot name="footer" :close="close" :ok="confirm">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" @click="$emit('close')">
                Отмена
              </button>
              <button type="button" class="btn btn-success" data-bs-dismiss="modal" @click="$emit('ok')">
                Сохранить
              </button>
            </slot>
          </div>
        </div>
      </div>
    </div>
  </teleport>
</template>

<script setup lang="ts">
interface Props {
  isOpen: boolean;
  name: string;
}
withDefaults(defineProps<Props>(), {
  isOpen: false,
  name: "Модалка",
});

const emit = defineEmits({
  close: null,
  ok: null,
});

const close = () => emit("close");
const confirm = () => emit("ok");
</script>

<script lang="ts">
export default {
  name: "BaseModal",
};
</script>
