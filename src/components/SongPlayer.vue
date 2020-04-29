<template>
  <div>
    <audio controls>
      <source :src="previewUrl" type="audio/mp3" />
    </audio>
  </div>
</template>

<script>
export default {
  props: ["previewUrl"]
};
</script>
