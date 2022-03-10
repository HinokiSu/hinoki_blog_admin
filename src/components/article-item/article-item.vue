<template>
  <div class="hinoki-blog article-item">
    <div class="item--wrapper">
      <div class="item__simple-content">
        <div class="title">
          {{ article?.title }}
        </div>

        <div class="description">
          {{ article?.description }}
        </div>
        <div class="release-time">
          <p>{{ article?.createdAt }}</p>
        </div>
      </div>
      <div class="item__collapse">
        <div class="collapse-btns">
          <div class="feature-btn">
            <router-link
              :to="{
                name: 'update-article',
                params: {
                  id: article?._id,
                },
              }"
            >
              <p>See</p>
            </router-link>
          </div>
          <div class="feature-btn" @click="clickHandler.edit">
            <p>Edit</p>
          </div>
          <div class="feature-btn" @click="clickHandler.delete">
            <p>Del</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { IArticle } from '@admin/interfaces/IArticle'
import { defineComponent, PropType } from 'vue'

export default defineComponent({
  name: 'ArticleItem',
  props: {
    article: Object as PropType<IArticle>,
  },
  emits: ['clickEdit', 'clickDelete'],
  setup(props, { emit }) {
    const clickHandler = {
      edit: () => {
        emit('clickEdit', props.article?._id)
      },
      delete: () => {
        emit('clickDelete', props.article?._id)
      },
    }
    return {
      clickHandler,
    }
  },
})
</script>

<style lang="less" scoped>
.hinoki-blog {
  &.article-item {
    & .item--wrapper {
      transition: all 0.4s ease;
      padding: 20px 20px 12px 20px;
      border-radius: 12px;

      .item__simple-content {
        min-width: 200px;
        width: 200px;
        padding: 16px;
        display: grid;
        grid-template-areas:
          'title'
          'desc'
          'time';
        row-gap: 10px;
        box-shadow: 0 0 30px var(--accents-2);

        .title,
        .description {
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: normal;
          -webkit-line-clamp: 1;
          -webkit-box-orient: vertical;
          word-break: break-all;

          display: -webkit-box;
        }

        .title {
          grid-area: title;
          padding-bottom: 5px;
          border-bottom: 2px dashed var(--accents-2);
          font-size: 1rem;
          font-weight: 600;
          color: var(--accents-7);
        }
        .description {
          font-weight: 500;
          grid-area: desc;
          font-size: 0.8rem;
        }

        .release-time {
          padding-top: 4px;
          border-top: 2px solid var(--accents-2);
          grid-area: time;
          font-size: 0.8rem;
        }
      }

      & .item__collapse {
        & .collapse-btns {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          justify-items: center;

          padding-top: 15px;
          .feature-btn {
            font-size: 0.8rem;
            font-weight: 500;
            cursor: pointer;

            transform: translateY(-50%);
            opacity: 0;
            transition: all 0.2s ease;
            transition-property: transform, opacity;
            transition-timing-function: cubic-bezier(1, 0, 0.65, 0.75), linear;
          }

          :nth-child(2) {
            transition-delay: 0.15s;
          }
          :nth-child(3) {
            transition-delay: 0.1s;
          }
        }
      }

      &:hover {
        box-shadow: 0 0 30px var(--accents-2);
        & .item__collapse {
          & .feature-btn {
            opacity: 1;
            transform: translateY(0);
            opacity: 1;
            transition-timing-function: cubic-bezier(0.2, 0.15, 0.1, 1), ease;
          }

          :nth-child(1) {
            transition-delay: 0.2s;
          }
          :nth-child(2) {
            transition-delay: 0.15s;
          }
          :nth-child(3) {
            opacity: 1;
          }
        }
      }
    }
  }
}
</style>
