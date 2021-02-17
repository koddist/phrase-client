<template>
  <div class="projects-container">
    <p class="no-data" v-if="projects.length === 0">No projects</p>
    <div class="projects">
      <div class="project"
           v-for="project in projects"
           :key="project.name">
        <img v-if="project.project_image_url" alt="Phrase" :src="project.project_image_url">
        <img alt="Phrase" v-if="!project.project_image_url" src="../assets/project.jpg">
        <div class="content">
          <p>{{ project.name }}
            <button class="edit-button" type="button"
              @click="editName($event)">Edit</button>
          </p>
          <div class="edit-mode hide">
            <input type="text" :value="project.name">
            <button
              type="button"
              class="save-button"
              @click="updateProject($event, project.id)">Save</button>
          </div>
          <span>Project was updated {{ getRelativeTime(project.updated_at) }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { mapState } from 'vuex';

export default {
  name: 'Projects',
  data() {
    return {
      projectName: '',
    };
  },
  props: ['projects'],
  created() {
    dayjs.extend(relativeTime);
  },
  computed: {
    ...mapState({
      logged: 'logged',
    }),
  },
  methods: {
    editName(event) {
      if (event.target.parentNode.nextSibling.classList.contains('hide')) {
        event.target.parentNode.nextSibling.classList.replace('hide', 'show');
      } else {
        event.target.parentNode.nextSibling.classList.replace('show', 'hide');
      }
    },
    updateProject(event, projectId) {
      const newName = event.target.previousSibling.value;
      const token = localStorage.getItem('token');
      axios.patch(`https://api.phrase.com/v2/projects/${projectId}`, {
        name: newName,
      }, { auth: { username: token, password: '' } }).then((r) => {
        if (r.status === 200) {
          this.$emit('projectUpdated', true);
          this.$forceUpdate();
        }
      }).catch((e) => {
        console.log(e);
      });
    },
    getRelativeTime(date) {
      return dayjs(date).fromNow();
    },
  },
};
</script>

<style lang="scss">
@import "src/styles/projects";
</style>
