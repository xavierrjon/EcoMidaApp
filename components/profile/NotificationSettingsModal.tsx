import {
  Modal,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Switch,
} from "react-native";
import { useEffect, useState } from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import DaysBeforeModal from "./DaysBeforeModal";

interface NotificationSettingsModalProps {
  visible: boolean;
  onClose: () => void;
  settings: {
    alertsEnabled: boolean;
    daysBefore: number;
    silentMode: boolean;
  };
  onSave: (data: {
    alertsEnabled: boolean;
    daysBefore: number;
    silentMode: boolean;
  }) => void;
}

export default function NotificationSettingsModal({
  visible,
  onClose,
  settings,
  onSave,
}: NotificationSettingsModalProps) {
  const [alertsEnabled, setAlertsEnabled] = useState(true);
  const [daysBefore, setDaysBefore] = useState(3);
  const [silentMode, setSilentMode] = useState(false);
  const [showDaysModal, setShowDaysModal] = useState(false);

  useEffect(() => {
    setAlertsEnabled(settings?.alertsEnabled ?? true);
    setDaysBefore(settings?.daysBefore ?? 3);
    setSilentMode(settings?.silentMode ?? false);
  }, [settings]);

  const handleSave = () => {
    onSave({
      alertsEnabled,
      daysBefore,
      silentMode,
    });
    onClose();
  };

  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.overlay}>
        <View style={styles.container}>
          
          <Text style={styles.title}>
            Configurações de Alertas
          </Text>

          <Text style={styles.subtitle}>
            Personalize suas preferências de notificação
          </Text>

          <ScrollView 
            style={styles.content}
            showsVerticalScrollIndicator={false}
          >
            <View style={styles.settingRow}>
              <MaterialCommunityIcons
                name="bell"
                size={28}
                color="#22C55E"
              />
              <View style={styles.settingContent}>
                <Text style={styles.settingTitle}>Alertas Ativos</Text>
                <Text style={styles.settingDescription}>
                  Receber alertas sobre alimentos próximos do vencimento.
                </Text>
              </View>
              <Switch
                value={alertsEnabled}
                onValueChange={setAlertsEnabled}
                trackColor={{
                  false: "#D1D5DB",
                  true: "#22C55E",
                }}
                thumbColor={alertsEnabled ? "#22C55E" : "#ffffff"}
              />
            </View>

            <View style={styles.divider} />

            <View style={styles.settingRow}>
              <MaterialCommunityIcons
                name="calendar-month"
                size={28}
                color="#22C55E"
              />
              <View style={styles.settingContent}>
                <Text style={styles.settingTitle}>Dias de Antecedência</Text>
                <Text style={styles.settingDescription}>
                  Quantos dias antes do vencimento receber alertas.
                </Text>
              </View>
              <TouchableOpacity
                style={styles.daysSelector}
                onPress={() => setShowDaysModal(true)}
              >
                <Text style={styles.daysText}>
                  {daysBefore} {daysBefore === 1 ? "dia" : "dias"}
                </Text>

                <MaterialCommunityIcons
                  name="chevron-down"
                  size={18}
                  color="#087829"
                />
              </TouchableOpacity>
            </View>

            <View style={styles.divider} />

            <View style={styles.settingRow}>
              <MaterialCommunityIcons
                name="weather-night"
                size={28}
                color="#22C55E"
              />
              <View style={styles.settingContent}>
                <Text style={styles.settingTitle}>Horário Silencioso</Text>
                <Text style={styles.settingDescription}>
                  Não receber alertas durante a noite.
                </Text>
              </View>
              <Switch
                value={silentMode}
                onValueChange={setSilentMode}
                trackColor={{
                  false: "#D1D5DB",
                  true: "#22C55E",
                }}
                thumbColor={silentMode ? "#22C55E" : "#FFFFFF"}
              />
            </View>
          </ScrollView>

          <View style={styles.footer}>
            <TouchableOpacity onPress={onClose}>
              <Text style={styles.cancel}>Cancelar</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
              <Text style={styles.saveText}>Salvar</Text>
            </TouchableOpacity>
          </View>
        
          <DaysBeforeModal
            visible={showDaysModal}
            currentValue={daysBefore}
            onClose={() => setShowDaysModal(false)}
            onSelect={(days) => setDaysBefore(days)}
          />
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "flex-end",
  },
  container: {
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    padding: 24,
    height: "70%", 
  },
  title: {
    fontSize: 26,
    fontWeight: "700",
    color: "#111827",
  },
  subtitle: {
    marginTop: 6,
    fontSize: 16,
    color: "#22C55E", 
  },
  content: {
    flex: 1,
    marginTop: 24,
  },
  settingRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
  },
  settingContent: {
    flex: 1,
    marginLeft: 16,
    marginRight: 12,
  },
  settingTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#111827",
  },
  settingDescription: {
    marginTop: 4,
    fontSize: 15,
    color: "#6B7280",
    lineHeight: 20,
  },
  divider: {
    height: 1,
    backgroundColor: "#E5E7EB",
    marginVertical: 18,
  },
  daysSelector: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F3F4F6", 
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 12,
    gap: 4,
  },
  daysText: {
    color: "#087829",
    fontWeight: "600",
  },
  footer: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    gap: 18,
  },
  cancel: {
    fontSize: 16,
    fontWeight: "700",
    color: "#111827",
  },
  saveButton: {
    backgroundColor: "#22C55E",
    paddingHorizontal: 28,
    paddingVertical: 12,
    borderRadius: 16, 
  },
  saveText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700",
  },
});