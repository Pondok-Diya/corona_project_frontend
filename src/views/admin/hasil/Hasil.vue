<template>
  <div>
    <b-row class="card-dest">
      <b-col>
        <b-card title="Skor">
          <b-card-text>
            <b-table striped hover :items="items" :fields="fields">
              <template v-slot:cell(created_at)="row">
                {{dateIna(row.item.created_at)}}
              </template>
              <template v-slot:cell(skor)="row">
                {{isZero(row.item.skor)}}
              </template>
            </b-table>
          </b-card-text>
        </b-card>
      </b-col>
    </b-row>
  </div>
</template>
<script>
import moment from "moment"
import logout from "../../logout";
import { user } from "../../../api";
export default {
  name: "Hasil",
  data() {
    return {
      items: [],
      fields: [{key: "nama", label: "Nama Siswa"}, "skor", {key: "created_at", label: "Dijawab pada"}]
    };
  },
  methods: {
    async loadData() {
      try {
        let data = await user.getSkor(this.$route.params.uuid_materi);
        this.items = data.data;
      } catch (err) {
        logout.clear();
      }
    },
    dateIna(value) {
      if (value == null) {
        return "-"
      }
      return moment(value).format("DD-MM-Y hh:mm:ss");
    },
    isZero(skor) {
      if (skor == null) {
        return 0;
      } else {
        return skor;
      }
    },
  },
  mounted() {
    this.loadData();
  },
};
</script>
<style scoped>
.card-dest {
  margin-top: 30px;
}
</style>