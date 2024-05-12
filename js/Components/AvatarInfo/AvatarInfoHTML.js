export default (name, gender) => {
  if (gender === "male")
    return ` <div>Hello ${name},<br/> hope you are doing great !</div>
             <img src="../../../assets/male_avatar.svg"/>`;
  if (gender === "female") {
    return `<div>Hello ${name},<br/> hope you are doing great !</div>
             <img src="../../../assets/female_avatar.svg"/>`;
  } else
    return `<div>Hello ${name},<br/> hope you are doing great !</div>
            <img src="../../../assets/happyface.svg"/>`;
};
