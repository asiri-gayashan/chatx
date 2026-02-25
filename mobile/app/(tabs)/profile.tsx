import { Text, ScrollView, Pressable } from 'react-native'
import React from 'react'
import { useAuth } from '@clerk/clerk-expo';


const Profile = () => {
    const { signOut } = useAuth();
    return (
      <ScrollView className='bg-surface' contentInsetAdjustmentBehavior='automatic'>
        <Text className="text-white">Profile</Text>
        <Pressable onPress={() => signOut()}>
          <Text className="text-red-500">Sign Out</Text>
        </Pressable>
      </ScrollView>
    )
}

export default Profile