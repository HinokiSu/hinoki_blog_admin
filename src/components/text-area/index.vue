<template>
  <div class="hino-text-area">
    <textarea
      class="text-area-main"
      :class="classes"
      ref="textareaRef"
      :value="modelValue"
      :placeholder="placeholder"
      @input="textareaHandler"
      @focus="focusHandler"
      @blur="blurHandler"
    >
    </textarea>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref } from 'vue'

export default defineComponent({
  name: 'HinoTextarea',
  props: {
    modelValue: {
      type: String,
    },
    placeholder: {
      type: String,
    },
    unscale: {
      type: Boolean,
    },
    unscroll: {
      type: Boolean,
    },
  },
  emits: ['update:modelValue', 'focus', 'blur'],
  setup(props, { emit }) {
    const textareaRef = ref<HTMLTextAreaElement>()
    const hoverRef = ref<boolean>(false)

    const updateValue = (val: string) => {
      if (textareaRef.value && val !== textareaRef.value.value) {
        textareaRef.value.value = val
      }
      // After selecting all the copied text, paste it directly
      if (val !== props.modelValue) {
        emit('update:modelValue', val)
      }
    }

    const focusHandler = (e: Event) => {
      hoverRef.value = true
      emit('focus', e)
    }
    const blurHandler = (e: Event) => {
      hoverRef.value = false
      emit('blur', e)
    }

    const classes = computed(() => ({
      unscale: props.unscale,
      unscroll: props.unscroll,
      hover: hoverRef.value,
    }))

    const textareaHandler = (e: Event) => updateValue((e.target as HTMLTextAreaElement).value)
    return {
      textareaRef,
      classes,
      updateValue,
      textareaHandler,
      focusHandler,
      blurHandler,
    }
  },
})
</script>

<style lang="less" scoped>
.hino-text-area {
  .text-area-main {
    display: inline-block;
    vertical-align: middle;
    width: inherit;
    height: inherit;
    user-select: none;
    border: 1px solid var(--accents-2);
    border-radius: 5px;
    transition: border 0.2s ease 0s, color 0.2s ease 0s;
    padding: 2px 10px;
    box-sizing: border-box;
    margin: 0;

    font-size: 1rem;
    font-weight: 400;
    background: inherit;

    &::placeholder {
      color: var(--accents-3);
    }

    // strip
    &::-webkit-scrollbar {
      width: 8px;
      height: 12px;
      background-color: var(--accents-1);
    }

    // track
    &::-webkit-scrollbar-track {
      box-shadow: inset 0 0 6px var(--accents-2);
      border-radius: 10px;
      background-color: var(--accents-1);
    }

    // slider
    &::-webkit-scrollbar-thumb {
      border-radius: 10px;
      background: var(--accents-5);
    }
  }

  & .hover {
    border-color: var(--accents-5);
  }

  & .unscale {
    resize: none;
  }

  & .unscroll {
    &::-webkit-scrollbar {
      width: 0;
    }
  }
}
</style>
