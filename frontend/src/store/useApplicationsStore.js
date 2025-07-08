import {create} from 'zustand';
import {axiosInstance} from '../lib/axios';

export const useApplicationsStore = create((set,get) => ({
    allComments: [],
    user: {},
    count: 0,
    fetchComments: async () => {
        try {
            const response = await axiosInstance.get('/comments');
            const capitalizeFirst = str =>
                typeof str === "string" && str.length > 0
                    ? str.charAt(0).toUpperCase() + str.slice(1)
                    : "";

            const formattedComments = response.data.map(eachcomment => ({
                ...eachcomment,
                name: capitalizeFirst(eachcomment.name),
                email: eachcomment.email.toLowerCase(),
                postId: eachcomment.postId,
                body: capitalizeFirst(eachcomment.body),
                

            }));
            set({ allComments: formattedComments });
        } catch (error) {
            console.error('Error fetching comments:', error);
        }
    },
    fetchUser:async()=> {
        try {
            const response = await axiosInstance.get('/users');
            const capitalizeFirst = str =>
                typeof str === "string" && str.length > 0
                    ? str.charAt(0).toUpperCase() + str.slice(1)
                    : "";
            const formattedUser = response.data.map(eachUser => ({
                ...eachUser,
                name: capitalizeFirst(eachUser.name),
                email: eachUser.email.toLowerCase(),
                Id: eachUser.id,
                phone: eachUser.phone.split("-").join(" "),
                address: eachUser.address.street + eachUser.address.suite + eachUser.address.city

            }));
            set({ user: formattedUser[0] });
        } catch (error) {
            console.error('Error fetching user:', error);
        }
    }
}));