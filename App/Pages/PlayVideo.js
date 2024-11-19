export default function PlayVideo() {
    const navigation = useNavigation();
    const param = useRoute().params;
    const [videoChapter, setVideoChapter] = useState(param?.courseContent);
    const [playing, setPlaying] = useState(false);

    const onStateChange = useCallback((state) => {
        if (state === "ended") {
            setPlaying(false);
        }
    }, []);

    return (
        <View style={{ padding: 20, marginTop: 25 }}>
            <TouchableOpacity onPress={() => navigation.goBack()} style={{ marginBottom: 10 }}>
                <Ionicons name="arrow-back-sharp" size={24} color="black" />
            </TouchableOpacity>
            {videoChapter ? (
                <View>
                    <Text style={{ marginBottom: 10, fontSize: 20, fontWeight: 'bold' }}>{videoChapter.name}</Text>
                    {videoChapter.videoUrl ? (  // Kiểm tra videoUrl có tồn tại không
                        <YoutubePlayer height={220} play={playing} videoId={videoChapter.videoUrl} onChangeState={onStateChange} />
                    ) : (
                        <Text>No video available</Text>  // Nếu không có video, hiển thị thông báo
                    )}
                    <Text style={{ fontWeight: 'bold', marginBottom: 10 }}>Description</Text>
                    <Text style={{ lineHeight: 20 }}>{videoChapter?.description}</Text>
                </View>
            ) : null}
        </View>
    );
}
