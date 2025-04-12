import React, { useState, useEffect } from 'react';
import { View, Text, useWindowDimensions, ScrollView } from 'react-native';
import { TabView, SceneMap, TabBar, TabBarProps } from 'react-native-tab-view';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import StoryCard from '../components/StoryCard';
import GameCard from '../components/GameCard';
import MemeCard from '../components/MemeCard';
import HomeTopper from '../components/HomeTopper'; // 👈 New Topper Component
import { useRouter } from 'expo-router';
import { useAppStore } from '../lib/store';

const StoriesRoute = () => {
  const router = useRouter();

  return (
    <ScrollView style={{ flex: 1, backgroundColor: '#f0f0f0', padding: 16 }}>


      <StoryCard
        title="All About Periods"
        description="Periods are a natural part of growing up..."
        image="https://cdn.pixabay.com/photo/2016/11/19/18/06/girl-1848474_1280.jpg"
        onPress={() => router.push({ pathname: '/story/[id]', params: { id: '1' } })}
      />
      <StoryCard
        title="Nutrition 101"
        description="What you eat really affects your mood..."
        image="https://images.unsplash.com/photo-1506806732259-39c2d0268443"
        onPress={() => router.push({ pathname: '/story/[id]', params: { id: '2' } })}
      />
      <StoryCard
        title="Sleep and Mental Health"
        description="Not sleeping well? That’s more serious than you think..."
        image="https://images.unsplash.com/photo-1515879218367-8466d910aaa4"
        onPress={() => router.push({ pathname: '/story/[id]', params: { id: '3' } })}
      />
      <StoryCard
        title="Understanding Consent"
        description="Consent is about mutual agreement..."
        image="https://cdn.pixabay.com/photo/2021/02/22/20/05/hug-6041356_1280.jpg"
        onPress={() => router.push('../../story/sexualhealth')}
      />
      <StoryCard
        title="Dealing with Stress"
        description="Follow Emma as she learns how to cope..."
        image="https://images.unsplash.com/photo-1549921296-3a6b0415a36b"
        onPress={() => router.push('../../story/mentalhealth')}
      />
    </ScrollView>
  );
};

const GamesRoute = () => {
  const router = useRouter();
  const setTab = useAppStore((state) => state.setDefaultTab);

  return (
    <ScrollView style={{ flex: 1, backgroundColor: '#e3f2fd', padding: 16 }}>
      <GameCard
        title="Substance Abuse Quiz"
        description="Test your knowledge about common myths and facts."
        icon="help-circle"
        onPress={() => {
          setTab(1);
          router.push({ pathname: '/app/game/[id]', params: { id: '1' } });
        }}
      />
      <GameCard
        title="Nutrition Puzzle"
        description="Find which foods match which benefits."
        icon="food-apple-outline"
        onPress={() => {
          setTab(1);
          router.push({ pathname: '/app/game/[id]', params: { id: '2' } });
        }}
      />
      <GameCard
        title="Sleep Trivia"
        description="Answer quick questions about sleep and mental health."
        icon="sleep"
        onPress={() => {
          setTab(1);
          router.push({ pathname: '/app/game/[id]', params: { id: '3' } });
        }}
      />
    </ScrollView>
  );
};

const MemesRoute = () => (
  <ScrollView style={{ flex: 1, backgroundColor: '#fce4ec', padding: 16 }}>
    <MemeCard
      image="https://i.imgflip.com/30b1gx.jpg"
      caption="When you finally understand React Native navigation!"
    />
    <MemeCard
      image="https://i.imgflip.com/3vzej.jpg"
      caption="Me trying to center a div in CSS..."
    />
    <MemeCard
      image="https://i.imgflip.com/4t0m5.jpg"
      caption="Debugging be like: It works on my machine 🤷"
    />
  </ScrollView>
);

const renderScene = SceneMap({
  stories: StoriesRoute,
  games: GamesRoute,
  memes: MemesRoute,
});

type RouteType = {
  key: string;
  title: string;
  icon: string;
};

export default function HomeScreen() {
  const layout = useWindowDimensions();
  const storedIndex = useAppStore((state) => state.defaultTab);
  const [index, setIndex] = useState(storedIndex);
  const [routes] = useState<RouteType[]>([
    { key: 'stories', title: 'Stories', icon: 'book-open-page-variant' },
    { key: 'games', title: 'Games', icon: 'gamepad-variant' },
    { key: 'memes', title: 'Memes', icon: 'emoticon-outline' },
  ]);

  const setTab = useAppStore((state) => state.setDefaultTab);
  useEffect(() => {
    setTab(index);
  }, [index]);

  return (
    <TabView
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={{ width: layout.width }}
      renderTabBar={(props: TabBarProps<RouteType>) => (
        <TabBar
          {...props}
          renderLabel={({ route, focused }: { route: RouteType; focused: boolean }) => (
            <View style={{ alignItems: 'center' }}>
              <MaterialCommunityIcons
                name={route.icon}
                size={22}
                color={focused ? '#ffffff' : '#ccc'}
              />
              <Text style={{ color: focused ? '#ffffff' : '#ccc', fontSize: 12, fontWeight: '600' }}>
                {route.title}
              </Text>
            </View>
          )}
          tabStyle={{
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            paddingVertical: 8,
          }}
          style={{
            backgroundColor: '#6200ee',
            elevation: 4,
            borderBottomLeftRadius: 16,
            borderBottomRightRadius: 16,
          }}
          indicatorStyle={{
            backgroundColor: '#ffcc00',
            height: 4,
            borderRadius: 4,
          }}
        />
      )}

    />
  );
}
