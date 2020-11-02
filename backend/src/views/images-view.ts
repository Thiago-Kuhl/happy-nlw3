import Images from "../models/Image";

export default {
  render(image: Images) {
    return {
      id: image.id,
      url: `${process.env.API_URL}/uploads/${image.path}`
    };
  },

  renderMany(images: Images[]){
    return images.map(image => this.render(image));
  }
};
