<template>
  <div class="pagination-container">
    <chevron-double-left-icon class="p-icon" :size="iconSize" @click="changePage(0)"/>
    <chevron-left-icon class="p-icon" :size="iconSize" @click="changePage(-1)"/>
    <span class="inner-content">Showing page {{ page }} of {{ pages }}</span>
    <chevron-right-icon class="p-icon" :size="iconSize" @click="changePage(1)"/>
    <chevron-double-right-icon class="p-icon" :size="iconSize" @click="changePage(pages)"/>
  </div>
</template>

<script>
import { Component, Vue } from 'vue-property-decorator';
import ChevronLeftIcon from 'vue-material-design-icons/ChevronLeft.vue';
import ChevronDoubleLeftIcon from 'vue-material-design-icons/ChevronDoubleLeft.vue';
import ChevronRightIcon from 'vue-material-design-icons/ChevronRight.vue';
import ChevronDoubleRightIcon from 'vue-material-design-icons/ChevronDoubleRight.vue';
import { mapMutations, mapState } from 'vuex';

@Component({
  components: {
    ChevronLeftIcon,
    ChevronRightIcon,
    ChevronDoubleLeftIcon,
    ChevronDoubleRightIcon,
  },
  computed: {
    ...mapState({
      pagination: 'pagination',
    }),
  },
  methods: {
    ...mapMutations([
      'updateCurrentPage',
    ]),
  },
  props: ['totalRecords', 'perPageOptions'],
})
export default class Pagination extends Vue {
  iconSize = 35;
  page = 1;
  perPage = this.perPageOptions[0];

  changePage(val) {
    // eslint-disable-next-line default-case
    switch (val) {
      case 0: this.page = 1; break;
      case -1: this.page = this.page > 1 ? this.page - 1 : this.page; break;
      case 1: this.page = this.page < this.pages ? this.page + 1 : this.page; break;
      case this.pages: this.page = this.pages; break;
    }

    this.$emit('input', { page: this.page, per_page: this.perPage });
  }

  get pages() {
    const remainder = this.totalRecords % this.perPage;
    let result;
    if (remainder !== 0) {
      result = Math.floor(this.totalRecords / this.perPage) + 1;
    } else {
      result = this.totalRecords / this.perPage;
    }
    return result;
  }
}
</script>

<style lang="scss">
@import "src/styles/colors";

.pagination-container {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  .inner-content {
    padding-bottom: 0.3rem;
    color: $grey-50;
  }
  .p-icon {
    color: $grey-30;
    cursor: pointer;
    &:hover {
      color: $grey-50;
      transition: 0.4s;
    }
  }
}
</style>
