<template lang="html">
  <div>
    <div class="meta">
      <a href="#" @click.prevent="toggleActive" v-bind:class="{'active': active}">
        <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" x="0px" y="0px" viewBox="0 0 100 100" enable-background="new 0 0 100 100" xml:space="preserve"><path d="M50,5C25.1,5,5,25.1,5,50c0,24.9,20.1,45,45,45c24.9,0,45-20.1,45-45C95,25.1,74.9,5,50,5L50,5z M57.1,75  c0,2.2-1.9,4.1-4.1,4.1h-6.2c-2.2,0-4.1-1.9-4.1-4.1V48.8c0-2.3,1.9-4.1,4.1-4.1h6.2c2.2,0,4.1,1.9,4.1,4.1V75z M49.9,37.9  c-4.6,0-8.4-3.8-8.4-8.5c0-4.7,3.8-8.5,8.4-8.5c4.7,0,8.5,3.8,8.5,8.5C58.4,34.1,54.6,37.9,49.9,37.9z"></path></svg>
      </a>
    </div>

      <div class="modal-wrapper" v-show="active">
        <section>
          <header>
            <p>
              <h1>Un Jour Dans la nuit</h1>
            </p>
          </header>
          <article>
            <p>
              Un super docu trop bien jte jure.
            </p>
            <p>
              <a href="#">@Amandine_Sanial</a>
              <a href="#">@cprocureur</a>
            </p>
          </article>
          <footer>
            <button type="button" name="closer" @click="toggleActive">close</button>
          </footer>
        </section>
      </div>
  </div>
</template>

<script>
export default {
  name: 'Meta',
  data() {
    return {
      active: false
    }
  },
  methods: {
    toggleActive: function () {
      this.active = !this.active
      this.$root.$emit('toggle-modal', this.active)
    },
    close: function () {
      this.active = false
    }
  }
}
</script>
<style lang="css" scoped>
  .meta{
    position: absolute;
    z-index: 9999;
    top: 30px;
    right: 30px;
  }
  .meta svg{
    width: 20px;
    fill: #DDDDDD;
    fill-opacity: 0.5;
  }
  .meta a:hover svg{
    fill-opacity: 1;
  }
  .meta a.active svg{
    fill: #FF4136;
    fill-opacity: 1;
  }

  .modal-wrapper{
    position: fixed;
    z-index: 9998;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.8);
  }
</style>
