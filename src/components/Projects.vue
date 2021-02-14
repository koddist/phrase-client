<template>
  <div class="projects-container">
    <p class="no-data" v-if="projects.length === 0">No projects</p>
    <div class="projects">
      <div class="project"
           v-for="project in projectsList"
           :key="project.name">
        <img :src="project.project_image_url">
        <div class="content">
          <p>{{ project.name }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { mapState } from 'vuex';
import { Project } from '@/models/login.model';

@Component({
  computed: {
    ...mapState({
      logged: 'logged',
    }),
  },
  props: ['projects'],
})
export default class Projects extends Vue {
  projectsList: Project[] = [];
  created() {
    this.projectsList = this.projects;
  }
}
</script>

<style lang="scss">
@import "src/styles/colors";

  .projects-container {
    padding: 2%;
    p.no-data {
      color: $grey-50;
      font-size: 1.2rem;
    }
    .projects {
      .project {
        max-width: 350px;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        border-radius: 10px;
        overflow: clip;
        img {
          width: 100%;
        }
        .content {
          width: 100%;
          display: flex;
          padding: 0.8rem;
          box-sizing: border-box;
          align-items: flex-start;
          background-color: $grey-10;
          p {
            font-weight: 600;
            font-size: 1.3rem;
          }
        }
      }
    }
  }
</style>
