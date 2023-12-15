import {Assets} from 'assets'
import clsx from 'clsx'
import {Dropdown} from 'components/Dropdown'
import {MySwitch} from 'components/MySwitch'
import {SelectableButton} from 'components/SelectableButton'
import {StyledScrollView} from 'components/StyledScrollView'
import {useFullSize} from 'hooks/useFullSize'
import {languages} from 'lib/languages'
import {observer} from 'mobx-react-lite'
import React, {FC, useState} from 'react'
import {Image, Linking, Text, TouchableOpacity, View} from 'react-native'
import {useStore} from 'store'
import {Widget} from 'stores/ui.store'
// @ts-ignore
import {BackButton} from 'components/BackButton'
import packageInfo from '../../package.json'
import {MyRadioButton} from 'components/MyRadioButton'

type ITEM = 'ABOUT' | 'GENERAL' | 'TRANSLATE'

export const SettingsWidget: FC = observer(() => {
  const store = useStore()
  useFullSize()
  const [selected, setSelected] = useState<ITEM>('GENERAL')

  return (
    <View className="h-full">
      <View className="px-4 py-3 border-b border-lightBorder dark:border-darkBorder flex-row g-2">
        <View className="flex-1">
          <BackButton onPress={() => store.ui.focusWidget(Widget.SEARCH)} />
        </View>
        <SelectableButton
          className="w-24 items-center justify-center"
          selected={selected === 'GENERAL'}
          onPress={() => setSelected('GENERAL')}
          title="General"
        />
        <SelectableButton
          className="w-24 items-center justify-center"
          selected={selected === 'TRANSLATE'}
          onPress={() => setSelected('TRANSLATE')}
          title="Translate"
        />
        <SelectableButton
          className="w-24 items-center justify-center"
          selected={selected === 'ABOUT'}
          onPress={() => setSelected('ABOUT')}
          title="About"
        />
        <View className="flex-1" />
      </View>

      <View className="flex-1 h-full">
        {selected === 'ABOUT' && (
          <View className="flex-1 justify-center items-center g-10 flex-row">
            <Image
              source={Assets.Logo}
              style={{
                height: 60,
                width: 180,
                tintColor: store.ui.isDarkMode ? 'white' : 'black',
              }}
            />
            <View className="g-2">
              <Text className="text-3xl">Sol</Text>
              <Text>version {packageInfo.version}</Text>
              <View className="flex-row items-center g-2">
                <Text className="">built by</Text>
                <Image source={Assets.OSP} className="h-6 w-6 rounded-full" />
                <Text className="font-semibold">ospfranco</Text>
              </View>
              <TouchableOpacity
                className="bg-blue-500 p-2 rounded justify-center items-center"
                onPress={() => {
                  Linking.openURL('https://sol.ospfranco.com/')
                }}>
                <Text className="text-white">Website</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}

        {selected === 'GENERAL' && (
          <StyledScrollView
            className="flex-1 h-full"
            contentContainerStyle="justify-center p-5 pb-12">
            <View className="flex-row items-center pb-2">
              <Text className="flex-1 text-right pr-6  font-semibold">
                Launch on start
              </Text>
              <View className="flex-1">
                <MySwitch
                  value={store.ui.launchAtLogin}
                  onValueChange={store.ui.setLaunchAtLogin}
                />
              </View>
            </View>

            <View className="flex-row py-2">
              <Text className="flex-1 text-right pr-6  font-semibold">
                Global shortcut
              </Text>
              <View className="flex-1">
                {[
                  {label: '⌘ Space', value: 'command' as const},
                  {label: '⌥ Space', value: 'option' as const},
                  {label: '⌃ Space', value: 'control' as const},
                ].map(({label, value}) => {
                  return (
                    <MyRadioButton
                      label={label}
                      value={value}
                      onValueChange={() => {
                        store.ui.setGlobalShortcut(value)
                      }}
                      selected={store.ui.globalShortcut === value}
                    />
                  )
                })}
              </View>
            </View>

            <View className="flex-row py-2">
              <Text className="flex-1 text-right pr-6  font-semibold">
                Scratchpad shortcut
              </Text>
              <View className="flex-1">
                {[
                  {label: '⌘ ⇧ Space', value: 'command' as const},
                  {label: '⇧ ⌥ Space', value: 'option' as const},
                  {label: 'Disabled', value: 'none' as const},
                ].map(({label, value}) => {
                  return (
                    <MyRadioButton
                      label={label}
                      value={value}
                      onValueChange={() => {
                        store.ui.setScratchpadShortcut(value)
                      }}
                      selected={store.ui.scratchpadShortcut === value}
                    />
                  )
                })}
              </View>
            </View>

            <View className="flex-row py-2">
              <Text className="flex-1 text-right pr-6  font-semibold">
                Clipboard manager shortcut
              </Text>
              <View className="flex-1">
                {[
                  {label: '⌘ ⇧ V', value: 'shift' as const},
                  {label: '⌘ ⌥ V', value: 'option' as const},
                  {label: 'Disabled', value: 'none' as const},
                ].map(({label, value}) => {
                  return (
                    <MyRadioButton
                      label={label}
                      value={value}
                      onValueChange={() => {
                        store.ui.setClipboardManagerShortcut(value)
                      }}
                      selected={store.ui.clipboardManagerShortcut === value}
                    />
                  )
                })}
              </View>
            </View>

            <View className="flex-row py-2">
              <Text className="flex-1 text-right pr-6  font-semibold">
                Show window on
              </Text>
              <View className="flex-1">
                {[
                  {
                    label: 'Frontmost window screen',
                    value: 'screenWithFrontmost' as const,
                  },
                  {
                    label: 'Screen with cursor',
                    value: 'screenWithCursor' as const,
                  },
                ].map(({label, value}) => {
                  return (
                    <MyRadioButton
                      label={label}
                      value={value}
                      onValueChange={() => {
                        store.ui.setShowWindowOn(value)
                      }}
                      selected={store.ui.showWindowOn === value}
                    />
                  )
                })}
              </View>
            </View>

            <View className="flex-row items-center py-2">
              <Text className="flex-1 text-right pr-6  font-semibold">
                Window Management Shortcuts
              </Text>
              <View className="flex-1">
                <MySwitch
                  value={store.ui.windowManagementEnabled}
                  onValueChange={store.ui.setWindowManagementEnabled}
                />
              </View>
            </View>

            <View className="flex-row items-center py-2">
              <Text className="flex-1 text-right pr-6  font-semibold">
                Show calendar
              </Text>
              <View className="flex-1">
                <MySwitch
                  value={store.ui.calendarEnabled}
                  onValueChange={store.ui.setCalendarEnabled}
                />
              </View>
            </View>

            <View className="flex-row items-center py-2">
              <Text className="flex-1 text-right pr-6  font-semibold">
                Show upcoming event in Menu Bar
              </Text>
              <View className="flex-1">
                <MySwitch
                  value={store.ui.showUpcomingEvent}
                  onValueChange={store.ui.setShowUpcomingEvent}
                />
              </View>
            </View>

            <View className="flex-row items-center py-2">
              <Text className="flex-1 text-right pr-6  font-semibold">
                Save clipboard history
              </Text>
              <View className="flex-1">
                <MySwitch
                  value={store.clipboard.saveHistory}
                  onValueChange={store.clipboard.setSaveHistory}
                />
              </View>
            </View>

            <View className="flex-row items-center py-2">
              <Text className="flex-1 text-right pr-6  font-semibold">
                Show background overlay
              </Text>
              <View className="flex-1">
                <MySwitch
                  value={store.ui.useBackgroundOverlay}
                  onValueChange={store.ui.setUseBackgroundOverlay}
                />
              </View>
            </View>

            <View className="flex-row items-center py-2">
              <Text className="flex-1 text-right pr-6  font-semibold">
                Blacken menubar
              </Text>
              <View className="flex-1">
                <MySwitch
                  value={store.ui.shouldHideMenubar}
                  onValueChange={store.ui.setShouldHideMenuBar}
                />
              </View>
            </View>

            <View className="flex-row items-center py-2">
              <Text className="flex-1 text-right pr-6  font-semibold">
                Forward media keys to media player
              </Text>
              <View className="flex-1">
                <MySwitch
                  value={store.ui.mediaKeyForwardingEnabled}
                  onValueChange={store.ui.setMediaKeyForwardingEnabled}
                />
              </View>
            </View>

            <View className="flex-row items-center py-2">
              <Text className="flex-1 text-right pr-6  font-semibold">
                Reduce transparency
              </Text>
              <View className="flex-1">
                <MySwitch
                  value={store.ui.reduceTransparency}
                  onValueChange={store.ui.setReduceTransparency}
                />
              </View>
            </View>
          </StyledScrollView>
        )}

        {selected === 'TRANSLATE' && (
          <View className="flex-1 p-6">
            <View className="flex-1 pt-8">
              <View className="flex-row items-center py-2 z-20">
                <Text className="flex-1 text-right mr-2">First language</Text>
                <View className="flex-1">
                  <Dropdown
                    className="w-40"
                    value={store.ui.firstTranslationLanguage}
                    onValueChange={v =>
                      store.ui.setFirstTranslationLanguage(v as any)
                    }
                    options={Object.values(languages).map(v => ({
                      // @ts-expect-error
                      label: `${v.name} ${v.flag ?? ''}`,
                      value: v.code,
                    }))}
                  />
                </View>
              </View>
              <View className="flex-row items-center py-2 z-10">
                <Text className="flex-1 text-right mr-2">Second language</Text>
                <View className="flex-1">
                  <Dropdown
                    className="w-40"
                    value={store.ui.secondTranslationLanguage}
                    onValueChange={v =>
                      store.ui.setSecondTranslationLanguage(v as any)
                    }
                    options={Object.values(languages).map((v, index) => ({
                      // @ts-expect-error
                      label: `${v.name} ${v.flag ?? ''}`,
                      value: v.code,
                    }))}
                  />
                </View>
              </View>
              <View className="flex-row items-center py-2">
                <Text className="flex-1 text-right mr-2">Third language</Text>
                <View className="flex-1">
                  <Dropdown
                    className="w-40"
                    value={store.ui.thirdTranslationLanguage ?? ''}
                    onValueChange={v =>
                      store.ui.setThirdTranslationLanguage(v as any)
                    }
                    options={Object.values(languages).map(v => ({
                      // @ts-expect-error
                      label: `${v.name} ${v.flag ?? ''}`,
                      value: v.code,
                    }))}
                  />
                </View>
              </View>
            </View>
          </View>
        )}
      </View>
    </View>
  )
})
