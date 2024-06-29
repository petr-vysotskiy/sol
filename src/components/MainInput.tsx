import {observer} from 'mobx-react-lite'
import {Image, View, useColorScheme} from 'react-native'
import {TextInput} from 'react-native-macos'
import {useStore} from 'store'
import colors from 'tailwindcss/colors'
import {Widget} from 'stores/ui.store'
import {BackButton} from './BackButton'
import {Assets} from 'assets'

type Props = {
  placeholder?: string
  showBackButton?: boolean
  style?: any
  className?: string
}

export const MainInput = observer<Props>(
  ({placeholder = 'What would you like to do?', showBackButton, style}) => {
    const store = useStore()
    const colorScheme = useColorScheme()

    return (
      <View className="min-h-[42px] max-h-[200px] px-3 flex-row items-center gap-2 m-1 flex-1">
        {showBackButton && (
          <BackButton
            onPress={() => {
              store.ui.setQuery('')
              store.ui.focusWidget(Widget.SEARCH)
            }}
          />
        )}
        {!showBackButton && (
          <View>
            <Image
              source={Assets.Logo}
              className="w-6 h-6"
              tintColor={
                colorScheme === 'dark'
                  ? colors.neutral[400]
                  : colors.neutral[600]
              }
            />
          </View>
        )}
        <TextInput
          autoFocus
          enableFocusRing={false}
          value={store.ui.query}
          onChangeText={store.ui.setQuery}
          // @ts-ignore
          className="text-lg flex-1"
          cursorColor={colorScheme === 'dark' ? colors.white : colors.black}
          // multiline
          placeholder={placeholder}
          placeholderTextColor={
            colorScheme === 'dark' ? colors.neutral[500] : colors.neutral[400]
          }
        />
      </View>
    )
  },
)
