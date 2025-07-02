const updateAvatar = async (avatar) => {
    const avatarInput = document.getElementById("avatar-input");
    const img = document.getElementById("avatar");
    avatarInput.click();

    avatarInput.addEventListener("change", (e) => {
        const avatar = URL.createObjectURL(e.target.files[0]);
        img.src = avatar;

        console.log("before", img.src);
        console.log("after", avatar);

    });
}

export default updateAvatar