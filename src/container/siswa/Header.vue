<template>
  <div>
    <b-navbar type="dark" variant="dark">
      <b-navbar-nav>
        <b-nav-item-dropdown text="Materi">
          <b-dropdown-item to="/siswa/daftar-materi">Materi</b-dropdown-item>
        </b-nav-item-dropdown>
        <b-nav-item-dropdown text="Soal">
          <b-dropdown-item to="/siswa/daftar-soal">Daftar Soal</b-dropdown-item>
        </b-nav-item-dropdown>
      </b-navbar-nav>
      <b-navbar-nav class="ml-auto">
        <b-nav-item-dropdown right>
          <!-- Using 'button-content' slot -->
          <template v-slot:button-content>
            {{$store.getters.getUser.username}}
            <b-icon icon="person-circle"></b-icon>
          </template>
          <b-dropdown-item @click="toProfile">Profile</b-dropdown-item>
          <b-dropdown-item @click="logout">Logout</b-dropdown-item>
        </b-nav-item-dropdown>
      </b-navbar-nav>
    </b-navbar>
  </div>
</template>
<script>
import { user } from "../../api";
export default {
  name: "Header",
  methods: {
    async logout() {
      let data = await user.logout();
      data.status == 200;
      this.$store.dispatch("logout");
      this.$store.dispatch("clearSoal");
      this.$store.dispatch("clearJawaban");
      this.$router.push("/login");
    },
    toProfile() {
      this.$router.push(`/siswa/profile/${this.$store.getters.getUser.uuid}`);
    }
  }
};
</script>