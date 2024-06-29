import clsx from 'clsx'
import {FullCalendar} from 'components/FullCalendar'
import {PermissionsBar} from 'components/PermissionsBar'
import {solNative} from 'lib/SolNative'
import {observer} from 'mobx-react-lite'
import React, {useEffect} from 'react'
import {View} from 'react-native'
import {useStore} from 'store'
import {Widget} from 'stores/ui.store'
import {ClipboardWidget} from 'widgets/clipboard.widget'
import {CreateItemWidget} from 'widgets/createItem.widget'
import {EmojisWidget} from 'widgets/emojis.widget'
import {FileSearchWidget} from 'widgets/fileSearch.widget'
import {OnboardingWidget} from 'widgets/onboarding.widget'
import {ProcessesWidget} from 'widgets/processes.widget'
import {ScratchpadWidget} from 'widgets/scratchpad.widget'
import {SearchWidget} from 'widgets/search.widget'
import {SettingsWidget} from 'widgets/settings.widget'
import {TranslationWidget} from 'widgets/translation.widget'

export let RootContainer = observer(() => {
  let store = useStore()
  let widget = store.ui.focusedWidget

  useEffect(() => {
    solNative.setWindowHeight(store.ui.windowHeight)
  }, [store.ui.windowHeight])

  if (widget === Widget.FILE_SEARCH) {
    return (
      <View className="h-full bg-neutral-50/50 dark:bg-neutral-950/50">
        <FileSearchWidget />
      </View>
    )
  }
  if (widget === Widget.CLIPBOARD) {
    return (
      <View className="h-full bg-neutral-50/50 dark:bg-neutral-950/50">
        <ClipboardWidget />
      </View>
    )
  }

  if (widget === Widget.EMOJIS) {
    return (
      <View className="h-full bg-neutral-50/50 dark:bg-neutral-950/50">
        <EmojisWidget />
      </View>
    )
  }

  if (widget === Widget.SCRATCHPAD) {
    return (
      <View className="h-full bg-neutral-50/50 dark:bg-neutral-950/50">
        <ScratchpadWidget />
      </View>
    )
  }

  if (widget === Widget.CREATE_ITEM) {
    return (
      <View className="h-full bg-neutral-50/50 dark:bg-neutral-950/50">
        <CreateItemWidget />
      </View>
    )
  }

  if (widget === Widget.ONBOARDING) {
    return (
      <View className="h-full bg-neutral-50/50 dark:bg-neutral-950/50">
        <OnboardingWidget />
      </View>
    )
  }

  if (widget === Widget.TRANSLATION) {
    return (
      <View className="h-full bg-neutral-50/50 dark:bg-neutral-950/50">
        <TranslationWidget />
      </View>
    )
  }

  if (widget === Widget.SETTINGS) {
    return (
      <View className="h-full bg-neutral-50/50 dark:bg-neutral-950/50">
        <SettingsWidget />
      </View>
    )
  }

  if (widget === Widget.PROCESSES) {
    return (
      <View className="h-full bg-neutral-50/50 dark:bg-neutral-950/50">
        <ProcessesWidget />
      </View>
    )
  }

  return (
    <View
      className={clsx('bg-neutral-50/50 dark:bg-neutral-950/50', {
        'h-full':
          !!store.ui.query ||
          (store.ui.calendarEnabled &&
            store.ui.calendarAuthorizationStatus === 'authorized'),
      })}>
      <SearchWidget />

      {!store.ui.query && store.ui.calendarEnabled && <FullCalendar />}

      <PermissionsBar />
    </View>
  )
})
