<template>
  <div class="pagination-container">
    <button class="p-icon" @click="changePage(0)" type="button">Start</button>
    <button class="p-icon" @click="changePage(-1)" type="button">Prev</button>
    <span class="inner-content">Showing page {{ page }} of {{ pages }}</span>
    <button class="p-icon" @click="changePage(1)" type="button">Next</button>
    <button class="p-icon" @click="changePage(pages)" type="button">End</button>
  </div>
</template>

<script>
import { mapMutations, mapState } from 'vuex';

export default {
  name: 'Pagination',
  data() {
    return {
      iconSize: 35,
      page: 1,
      perPage: this.perPageOptions[0],
    };
  },
  props: ['totalRecords', 'perPageOptions'],
  computed: {
    ...mapState({
      pagination: 'pagination',
    }),
    pages() {
      const remainder = this.totalRecords % this.perPage;
      let result;
      if (remainder !== 0) {
        result = Math.floor(this.totalRecords / this.perPage) + 1;
      } else {
        result = this.totalRecords / this.perPage;
      }
      return result;
    },
  },
  methods: {
    ...mapMutations([
      'updateCurrentPage',
    ]),
    changePage(val) {
      switch (val) {
        case 0: this.page = 1; break;
        case -1: this.page = this.page > 1 ? this.page - 1 : this.page; break;
        case 1: this.page = this.page < this.pages ? this.page + 1 : this.page; break;
        case this.pages: this.page = this.pages; break;
        default: this.page = this.pages; break;
      }
      this.$emit('paginated', { page: this.page, per_page: this.perPage });
    },
  },
};
</script>

<style lang="scss">
@import "src/styles/pagination.scss";
</style>
