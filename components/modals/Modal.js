import { MaterialIcons } from "@expo/vector-icons";
import {
  Pressable,
  StyleSheet,
  Text,
  View,
  Modal as ReactModal,
} from "react-native";

export default function Modal({
  isVisible,
  setVisible,
  title,
  onPressValidation,
  children,
}) {
  return (
    <ReactModal animationType="slide" transparent={true} visible={isVisible}>
      <View style={styles.modalContent}>
        <View style={styles.modalTitleBar}>
          <Text style={styles.modalTitle}>{title}</Text>
          <Pressable
            style={styles.closeButton}
            onPress={() => setVisible(false)}
          >
            <MaterialIcons
              name="close"
              size={22}
              color={colors.buttonText}
            ></MaterialIcons>
          </Pressable>
        </View>

        {children}

        <Pressable onPress={onPressValidation}>
          <Text style={styles.validateButton}>Valider</Text>
        </Pressable>
      </View>
    </ReactModal>
  );
}

const styles = StyleSheet.create({
  modalContent: {
    padding: 10,
    width: "90%",
    backgroundColor: colors.background,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: "#5A429B",
    position: "absolute",
    bottom: "30%",
    left: "5%",
  },
  modalTitleBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    margin: 10,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#5A429B",
  },
  validateButton: {
    backgroundColor: "#5A429B",
    padding: 5,
    textAlign: "center",
    borderRadius: 10,
    width: "20%",
    alignSelf: "center",
    marginTop: 10,
    color: "#E8DEF8",
  },
});
