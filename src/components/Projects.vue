<template>
  <div class="projects-container">
    <p class="no-data" v-if="projects.length === 0">No projects</p>
    <div class="projects">
      <div class="project"
           v-for="project in projectsList"
           :key="project.name">
        <img alt="Phrase"
          :src="project.project_image_url ? project.project_image_url : './project.jpg'">
        <div class="content">
          <p>{{ project.name }}
            <button class="edit-button" type="button"
                    @click="editName($event)">Edit</button>
          </p>
          <div class="edit-mode hide">
            <input type="text" :value="project.name">
            <button class="save-button" @click="updateProject($event, project.id)">Save</button>
          </div>
          <span>Project was updated {{ getRelativeTime(project.updated_at) }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { mapState } from 'vuex';
import { Project } from '@/models/login.model';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import axios from 'axios';

@Component({
  computed: {
    ...mapState({
      logged: 'logged',
    }),
  },
  props: ['projects'],
})
export default class Projects extends Vue {
  projectName = '';
  projectsList: Project[] = [];
  created() {
    dayjs.extend(relativeTime);
    this.projectsList = this.projects;
  }

  editName(event: any) {
    if (event.target.parentNode.nextSibling.classList.contains('hide')) {
      event.target.parentNode.nextSibling.classList.remove('hide');
    } else {
      event.target.parentNode.nextSibling.classList.add('hide');
    }
  }

  updateProject(event: any, projectId: string) {
    const newName = event.target.previousSibling.value;
    const token = localStorage.getItem('token') as string;
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
  }

  getRelativeTime(date: string) {
    return dayjs(date).fromNow();
  }
}
</script>

<style lang="scss">
@import "src/styles/colors";

  @mixin smallButton($color) {
    background-color: $color;
    margin-left: 0.3rem;
    border: 0;
    border-radius: 3px;
    padding: 0.2rem;
    color: white;
    cursor: pointer;
    font-size: 0.8rem;
  }

  .hide {
    display: none !important;
  }

  .projects-container {
    padding: 4% 2% 4% 2%;
    margin-right: auto;
    margin-left: auto;
    p.no-data {
      color: $grey-50;
      font-size: 1.2rem;
    }
    .projects {
      display: grid;
      grid-gap: 2rem;
      grid-template-columns: auto auto auto auto;
      justify-content: center;
      .project {
        max-width: 350px;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        border-radius: 10px;
        overflow: clip;
        img {
          width: 100%;
          max-height: 300px;
        }
        .content {
          width: 100%;
          display: flex;
          padding: 0.8rem;
          box-sizing: border-box;
          align-items: flex-start;
          background-color: $grey-10;
          flex-direction: column;
          .edit-button {
            @include smallButton(orange);
          }
          .edit-mode {
            width: 100%;
            display: grid;
            grid-template-columns: auto auto;
            height: 35px;
            margin-top: 0.5rem;
            .save-button {
              @include smallButton(green)
            }
          }
          p {
            font-weight: 600;
            font-size: 1.3rem;
          }
          span {
            align-self: flex-end;
            margin-top: 1rem;
            color: $grey-50;
            font-size: 0.85rem;
          }
        }
      }
    }
  }
</style>
