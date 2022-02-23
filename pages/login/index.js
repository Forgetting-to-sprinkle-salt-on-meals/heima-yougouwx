// pages/login/index.js
Page({
    handleGetUserProfile(e){
        wx.getUserProfile({
            desc:'用于完善用户资料',
            success: (res) => {
                // console.log(res);
                const {userInfo} = res;
                console.log(userInfo);
                wx.setStorageSync("userInfo", userInfo);
            },
            fail: (err) => {
                console.log(err);
            },
            complete: () =>{
                wx.navigateBack({
                    delta: 1
                });
            }
        })
        // console.log(e);

        // console.log(userInfo);
        // wx.setStorageSync("userInfo", userInfo);
        // wx.navigateBack({
        //     delta: 1
        // });
        
    }

})