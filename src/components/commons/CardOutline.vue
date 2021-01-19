<template>
  <router-link :to="url">
    <div class="card" :class="border">
      <img class="card__icon" :src="icon" :alt="title" />
      <p class="card__title">{{ title }}</p>
    </div>
  </router-link>
</template>

<script>
export default {
  props: {
    icon: {
      type: String,
      required: true
    },
    title: {
      type: String,
      required: true
    },
    border: {
      type: String,
      required: true
    },
    url: {
      type: String,
      required: true
    }
  }
}
</script>

<style lang="scss" scoped>
.card {
  width: 200px;
  height: 235px;
  border-radius: 10px;
  border: 1px solid $color-text;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin: 32px 16px;
  cursor: pointer;
  transition: all .2s;

  &:hover {
    box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
  }

  &__icon {
    margin-bottom: 32px;
  }

  &__title {
    font-weight: 600;
    font-size: 16px;
    text-decoration: none;
  }
}

.border-height {
  color: $color-primary;
  border: 1px solid $color-primary;
}

.border-foods {
  color: $color-text;
  border: 1px solid $color-text;
}

.border-heart {
  color: $color-red;
  border: 1px solid $color-red;
}

.border-physical-activities {
  color: $color-green-light;
  border: 1px solid $color-green-light;
}
</style>
