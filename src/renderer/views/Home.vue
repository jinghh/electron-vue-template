<template>
  <div>
    <img
      src="https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fhbimg.b0.upaiyun.com%2F4938266c6f4ece31e63db7dc53a4e59feaf53afd26ed3-DF3gF8_fw658&refer=http%3A%2F%2Fhbimg.b0.upaiyun.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1641034129&t=3eae8437020854ed271c050200c6e8eb"
      alt=""
    />
    <div v-for="article in sources" :key="article.id">
      <div class="article">
        <a :href="article.url">
          <h2>{{ article.title }}</h2>
        </a>
        <img :src="article.urlToImage" />
        <p>{{ article.description }}</p>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      sources: [],
    };
  },
  mounted() {
    const apiKey = "fa35a325ddfa4c4798102ebb76809bbb";
    this.$http
      .get(`https://newsapi.org/v2/sources?apiKey=${apiKey}`)
      .then((res) => {
        this.sources = res.sources;
      });
  },
};
</script>