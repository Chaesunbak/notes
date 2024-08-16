const Profile = () => {

    const user = JSON.parse(localStorage.getItem('user'));

    console.log(user);

    return (
        <div className="profile">
            {user.name}
        </div>
    )
}

export default Profile;