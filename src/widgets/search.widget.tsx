import {Icons} from 'assets'
import clsx from 'clsx'
import {FileIcon} from 'components/FileIcon'
import {LoadingBar} from 'components/LoadingBar'
import {MainInput} from 'components/MainInput'
import {StyledFlatList} from 'components/StyledFlatList'
import {observer} from 'mobx-react-lite'
import React, {FC, useEffect, useRef} from 'react'
import {FlatList, Image, Platform, Text, View, ViewStyle} from 'react-native'
import {useStore} from 'store'
import {ItemType, Widget} from 'stores/ui.store'
import customColors from '../colors'
import {GradientView} from 'components/GradientView'
import {Key} from 'components/Key'

type Props = {
  style?: ViewStyle
  className?: string
}

export const SearchWidget: FC<Props> = observer(({style}) => {
  const store = useStore()
  const focused = store.ui.focusedWidget === Widget.SEARCH
  const listRef = useRef<FlatList | null>(null)

  useEffect(() => {
    if (focused && store.ui.items.length) {
      listRef.current?.scrollToIndex({
        index: store.ui.selectedIndex,
        viewOffset: 80,
      })
    }
  }, [focused, store.ui.selectedIndex])

  // assignment to get mobx to update the component
  const items = store.ui.items

  const renderItem = ({item, index}: {item: Item; index: number}) => {
    const isActive = index === store.ui.selectedIndex

    // this is used for things like calculator results
    if (item.type === ItemType.TEMPORARY_RESULT) {
      return (
        <View
          className={'flex-row items-center'}
          style={{
            backgroundColor: isActive ? customColors.accentBg : undefined,
          }}>
          <View className={clsx('flex-1 px-4')}>
            <Text className="text-neutral-600 dark:text-neutral-400">
              {store.ui.query}
            </Text>
            <Text className="text-2xl font-semibold mt-2">
              {store.ui.temporaryResult}
            </Text>
          </View>
        </View>
      )
    }

    return (
      <GradientView
        className={'flex-row items-center'}
        startColor={isActive ? `${customColors.accent}BB` : '#00000000'}
        endColor={isActive ? `${customColors.accent}77` : '#00000000'}
        cornerRadius={10}
        angle={90}>
        <View className="flex-1 flex-row items-center px-4 h-12">
          {!!item.url && (
            <View className="g-1 items-center flex-row">
              {item.isRunning && (
                <View className="absolute -left-2 h-1 w-1 rounded-full bg-neutral-600 dark:bg-neutral-400" />
              )}
              <FileIcon
                url={item.url}
                className={clsx('w-5 h-5', {
                  'opacity-60': !isActive,
                  'opacity-100': isActive,
                })}
              />
            </View>
          )}
          {item.type !== ItemType.CUSTOM && !!item.icon && (
            <Text
              className={clsx('opacity-60', {
                'opacity-100': isActive,
              })}>
              {item.icon}
            </Text>
          )}
          {item.type === ItemType.CUSTOM && !!item.icon && (
            <View
              className={clsx(
                'w-5 h-5 rounded items-center justify-center opacity-60 bg-white dark:bg-black',
                {
                  'opacity-100': isActive,
                },
              )}>
              <Image
                // @ts-expect-error
                source={Icons[item.icon]}
                style={{
                  tintColor: item.color,
                  height: 16,
                  width: 16,
                }}
              />
            </View>
          )}
          {!!item.iconImage && (
            <Image
              source={item.iconImage}
              className={clsx('w-5 h-5 opacity-60', {
                'opacity-100': isActive,
              })}
              resizeMode="contain"
            />
          )}
          {/* Somehow this component breaks windows build */}
          {(Platform.OS === 'macos' || Platform.OS === 'ios') &&
            !!item.IconComponent && (
              <item.IconComponent
                className={clsx({
                  'opacity-60': !isActive,
                  'opacity-100': isActive,
                })}
              />
            )}
          <Text
            numberOfLines={1}
            className={clsx('ml-3 text-black dark:text-white max-w-xl', {
              'text-white': isActive,
            })}
            style={{fontSize: 15}}>
            {item.name}
          </Text>

          <View className="flex-1" />
          {!!item.subName && (
            <Text
              className={clsx('ml-3 text-neutral-500 dark:text-neutral-300', {
                'text-white': isActive,
              })}>
              {item.subName}
            </Text>
          )}
          {item.type === ItemType.BOOKMARK && (
            <Text
              className={clsx('dark:text-neutral-300', {
                'text-white': isActive,
              })}>
              Bookmark
            </Text>
          )}
          {item.type === ItemType.PREFERENCE_PANE && (
            <Text
              className={clsx('dark:text-neutral-300 text-neutral-500', {
                'text-white dark:text-neutral-300': isActive,
              })}>
              System Settings
            </Text>
          )}
          {/* {item.type === ItemType.CUSTOM && (
            <Key title="Delete" symbol="⇧ delete" />
          )} */}
          {!!item.shortcut && (
            <View className="flex-row g-1 items-center">
              {item.shortcut.split(' ').map((char, i) => {
                // if (char === 'then') {
                //   return (
                //     <Text key={i} className="text-sm dark:text-neutral-400">
                //       then
                //     </Text>
                //   )
                // }
                return (
                  <Key
                    key={i}
                    title={''}
                    symbol={char !== 'then' ? char : undefined}
                  />
                )
              })}
            </View>
          )}
        </View>
      </GradientView>
    )
  }

  return (
    <View
      style={style}
      className={clsx({
        'flex-1': !!store.ui.query,
      })}>
      <MainInput />

      {!!store.ui.query && (
        <>
          <LoadingBar />
          <StyledFlatList
            className="flex-1"
            windowSize={8}
            contentContainerStyle="flex-grow p-2"
            ref={listRef}
            data={items}
            keyExtractor={(item: any, i) => `${item.name}-${item.type}-${i}`}
            renderItem={renderItem as any}
            showsVerticalScrollIndicator={false}
            ListEmptyComponent={
              <View className="flex-1 items-center justify-center g-4">
                <View className="h-20 w-20 rounded-full border border-neutral-300 dark:border-neutral-700" />
                <Text className="text-neutral-500">No results</Text>
              </View>
            }
          />

          <View
            className="border-t py-2 px-4 border-lightBorder dark:border-darkBorder flex-row items-center justify-end g-1"
            style={{
              backgroundColor: store.ui.isDarkMode ? '#00000018' : '#00000005',
            }}>
            {store.ui.currentItem?.type === ItemType.CUSTOM && (
              <>
                <Text className="text-sm mr-2">Delete</Text>
                <Key symbol={'⇧'} />
                <Key symbol={'delete'} />
                <View className="border-l h-2/3 border-lightBorder dark:border-darkBorder mx-2" />
              </>
            )}
            <Text className="text-sm mr-2">Translate</Text>
            <Key symbol={'⇧'} />
            <Key symbol={'⏎'} />
            <View className="border-l h-2/3 border-lightBorder dark:border-darkBorder mx-2" />
            <Text className="text-sm mr-2">Google search</Text>
            {!!items.length && <Key symbol={'⌘'} />}
            <Key symbol={'⏎'} primary={!items.length} />
            {!!items.length && (
              <>
                <View className="border-l h-2/3 border-lightBorder dark:border-darkBorder mx-2" />
                <Text className="text-sm mr-2">Select</Text>
                <Key symbol={'⏎'} primary />
              </>
            )}
          </View>
        </>
      )}
    </View>
  )
})
