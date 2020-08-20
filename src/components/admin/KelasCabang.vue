<template>
  <div>
    <b-row>
      <b-col>
        <b-card :title="title">
          <b-card-text>
            <b-row>
              <b-col>
                <b-btn size="sm" @click="update">
                  <b-icon icon="pencil-square"></b-icon> Update
                </b-btn>
              </b-col>
              <b-col>
                <b-btn size="sm" @click="hapus" class="kiri">
                  <b-icon icon="trash"></b-icon> Hapus
                </b-btn>
              </b-col>
            </b-row>
          </b-card-text>
        </b-card>
      </b-col>
    </b-row>
  </div>
</template>
<script>
import { user } from "../../api";
export default {
  name: "KelasCabang",
  props: { uuid: String, label: String },
  data() {
    return {
      title: `Kelas ${this.$route.params.kelas.concat(" ", this.label)}`,
    };
  },
  methods: {
    hapus() {
        this.showMessageWarning(this.uuid)
    },
    showMessageWarning(uuid) {
      this.$bvModal
        .msgBoxConfirm(
          `Apakah anda yakin untuk menghapus kelas ini?`,
          {
            title: "Perhatian!!!",
            size: "sm",
            buttonSize: "sm",
            okVariant: "success",
            cancelVariant: "danger",
            headerClass: "p-2 border-bottom-0",
            footerClass: "p-2 border-top-0",
            centered: true
          }
        )
        .then(value => {
          if (value) {
            user.deleteKelas(uuid);
            this.$emit("deleted")
          }
        });
    },
    update() {
      this.$router.push(`/update-kelas/${this.uuid}`);
    },
  },
};
</script>
<style scoped>
.kiri {
  float: right;
}
</style>