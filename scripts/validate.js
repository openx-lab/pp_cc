function getCookie(name) {
    var value = "; " + document.cookie;
    var parts = value.split("; " + name + "=");
    if (parts.length == 2) return parts.pop().split(";").shift();
}

if (document.location.host == 'gitcourse.kfcoding.com') {
    console.log(data)
    fetch('http://api.kfcoding.com/api/basic/users/current', {
        headers: {
            'Content-Type': 'application/json',
            Authorization: getCookie('token')
        },
        method: 'GET',
    }).then(resp => resp.json()).then(data => {

        if (data.status !== 200) {
        window.location.href = "http://kfcoding.com/user/login?redirect=" + window.location.href;
        }
    });

    var gitRepo = window.location.href.substr(window.location.href.indexOf("#")+1, window.location.href.length)

    fetch('http://api.kfcoding.com/api/basic/scenes/isIn', {
        headers: {
            'Content-Type': 'application/json',
            Authorization: getCookie('token')
        },
        method: 'POST',
        body: JSON.stringify({repo: gitRepo})
    }).then(resp => resp.json()).then(data => {
        console.log(data)
        if (data.data.status !== 200) {
            window.location.href = "http://kfcoding.com/user/login?redirect=" + window.location.href;
        } else {
            if(!data.data.rel)
                window.location.href = "http://kfcoding.com/account/authBook?redirect=" + window.location.href;
        }
    });

}