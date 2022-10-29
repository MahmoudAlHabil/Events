import { View, Text, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import styles from './styles'
import Icon from 'react-native-vector-icons/Ionicons'
import Entypo from 'react-native-vector-icons/Entypo'
import { colors } from '../../../utils'
import { useNotificationsContext } from '../../../context'
import Modal from "react-native-modal"
import { Button } from '../../../sharedComponents'

const NotificationItem = ({ item }) => {
    const { title, time, touched } = item
    const style = styles(touched)
    const [modalVisible, setModalVisible] = useState(false)
    const { dispatchNotifications } = useNotificationsContext()

    const handleNotification = () => {
        if (!touched) {
            dispatchNotifications({ type: "READ_NOTIFICATION", payload: { id: item.id - 1 } })
        }
        setModalVisible(true)
    }

    return (
        <TouchableOpacity style={style.container}
            onPress={handleNotification} activeOpacity={0.8}>
            <Icon name='notifications-circle' size={40} color={colors.primary.main} />
            <Text style={style.title}>{title.length > 28 ? title.slice(0, 28) + '...' : title}</Text>
            <Text style={style.time}>{time}</Text>
            <Modal isVisible={modalVisible}
                onBackdropPress={() => setModalVisible(false)}
                onSwipeComplete={() => setModalVisible(false)}
                swipeDirection={["left", "right", "down", "up"]}
                backdropOpacity={0.5}
                style={style.modal}
            >
                <View style={style.contentModal}>
                    <Entypo name='emoji-flirt' size={40} color={colors.primary.main} />
                    <Text style={style.modalText}>{title}</Text>
                    <Button title="حسناً" onPress={() => setModalVisible(false)} buttonStyle={style.modalButton} />
                </View>
            </Modal>
        </TouchableOpacity>
    )
}

export default NotificationItem